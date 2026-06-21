// Utamu wa Miwa - Serverless API
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, testConnection } from './database/config.js';

// Load .env from current directory
dotenv.config();
import { 
  registerUser, 
  loginUser, 
  adminLogin, 
  logoutUser, 
  getUserProfile, 
  authenticateToken, 
  requireAdmin 
} from './auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
testConnection().then(success => {
  if (success) {
    console.log('Server starting on port', PORT);
  } else {
    console.log('Database connection failed');
    process.exit(1);
  }
});

// Authentication Routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.post('/api/auth/admin/login', adminLogin);
app.post('/api/auth/logout', logoutUser);

// Protected Routes
app.get('/api/user/profile', authenticateToken, getUserProfile);

// Admin Routes
app.get('/api/admin/dashboard', requireAdmin, (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      message: 'Welcome to admin dashboard',
      user: req.user 
    } 
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Products API
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.name_key,
        p.description_key,
        p.image_url,
        p.image_set,
        p.gradient,
        p.badge_key,
        p.is_active,
        c.name_key as category_key,
        c.display_name as category_name,
        p.sort_order
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
      ORDER BY p.sort_order ASC
    `);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Product details with prices
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        p.*,
        c.name_key as category_key,
        c.display_name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1 AND p.is_active = true
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    const product = result.rows[0];
    
    // Get prices for this product
    const pricesResult = await pool.query(`
      SELECT size, price, currency
      FROM prices
      WHERE product_id = $1 AND is_active = true
      ORDER BY 
        CASE size 
          WHEN 'Small' THEN 1 
          WHEN 'Medium' THEN 2 
          WHEN 'Large' THEN 3 
          ELSE 4 
        END
    `, [id]);
    
    product.prices = pricesResult.rows;
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Categories API
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name_key, display_name, sort_order
      FROM categories
      WHERE is_active = true
      ORDER BY sort_order ASC
    `);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Orders API
app.post('/api/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { user_id, items, delivery_info, order_note } = req.body;
    
    // Create order
    const orderResult = await client.query(`
      INSERT INTO orders (user_id, order_number, total_amount, status, delivery_type, order_note)
      VALUES ($1, $2, $3, 'pending', $4, $5)
      RETURNING id
    `, [
      user_id,
      'ORD-' + Date.now(),
      items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      delivery_info?.delivery_type || 'pickup',
      order_note
    ]);
    
    const orderId = orderResult.rows[0].id;
    
    // Create order items
    for (const item of items) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, size, quantity, unit_price, total_price)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [orderId, item.product_id, item.size, item.quantity, item.unit_price, item.total_price]);
    }
    
    // Create delivery info
    if (delivery_info) {
      await client.query(`
        INSERT INTO delivery_info (order_id, customer_name, phone, address, scheduled_time, delivery_fee)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [orderId, delivery_info.name, delivery_info.phone, delivery_info.address, delivery_info.scheduled_time, delivery_info.delivery_fee || 0]);
    }
    
    await client.query('COMMIT');
    
    res.json({
      success: true,
      data: { order_id: orderId }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Reviews API
app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const result = await pool.query(`
      SELECT 
        r.id,
        r.rating,
        r.review_text,
        r.created_at,
        u.name as user_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.product_id = $1 AND r.is_approved = true
      ORDER BY r.created_at DESC
      LIMIT 10
    `, [productId]);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Utamu wa Miwa API running on port ${PORT}`);
});
