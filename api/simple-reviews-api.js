// Utamu wa Miwa - Simple Reviews API
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  max: 5,
  connectionTimeoutMillis: 30000,
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to Neon PostgreSQL successfully');
    const result = await client.query('SELECT NOW()');
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

testConnection();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'Configured' : 'Not configured'
  });
});

// Get all products
app.get('/api/products', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT p.id, p.name_key, p.description_key, p.image_url, p.image_set, 
             p.gradient, p.badge_key, p.is_active, p.sort_order
      FROM products p
      WHERE p.is_active = true
      ORDER BY p.sort_order, p.name_key
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  } finally {
    client.release();
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT id, name_key, description_key, is_active, sort_order
      FROM categories
      WHERE is_active = true
      ORDER BY sort_order, name_key
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  } finally {
    client.release();
  }
});

// Get reviews for a specific product
app.get('/api/reviews/:productId', async (req, res) => {
  const { productId } = req.params;
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT r.id, r.customer_name, r.rating, r.review_text, r.is_approved, 
             r.helpful_votes, r.created_at
      FROM reviews r
      WHERE r.product_id = $1 AND r.is_approved = true
      ORDER BY r.created_at DESC
    `, [productId]);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews'
    });
  } finally {
    client.release();
  }
});

// Get all reviews (for reviews page)
app.get('/api/reviews', async (req, res) => {
  const { page = 1, limit = 10, rating, sortBy = 'created_at', sortOrder = 'DESC' } = req.query;
  const offset = (page - 1) * limit;
  
  const client = await pool.connect();
  try {
    let query = `
      SELECT r.id, r.customer_name, r.rating, r.review_text, r.is_approved, 
             r.helpful_votes, r.created_at,
             p.name_key as product_key
      FROM reviews r
      JOIN products p ON r.product_id = p.id
      WHERE r.is_approved = true
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (rating) {
      query += ` AND r.rating = $${++paramCount}`;
      params.push(rating);
    }
    
    query += ` ORDER BY r.${sortBy} ${sortOrder}`;
    query += ` LIMIT $${++paramCount} OFFSET $${++paramCount}`;
    params.push(limit, offset);
    
    const result = await client.query(query, params);
    
    // Get total count for pagination
    const countQuery = rating 
      ? 'SELECT COUNT(*) FROM reviews WHERE is_approved = true AND rating = $1'
      : 'SELECT COUNT(*) FROM reviews WHERE is_approved = true';
    
    const countParams = rating ? [rating] : [];
    const countResult = await client.query(countQuery, countParams);
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].count),
        totalPages: Math.ceil(countResult.rows[0].count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews'
    });
  } finally {
    client.release();
  }
});

// Submit a new review
app.post('/api/reviews', async (req, res) => {
  const { product_id, customer_name, email, rating, review_text } = req.body;
  
  if (!product_id || !customer_name || !rating) {
    return res.status(400).json({
      success: false,
      error: 'Product ID, customer name, and rating are required'
    });
  }
  
  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      error: 'Rating must be between 1 and 5'
    });
  }
  
  const client = await pool.connect();
  try {
    const result = await client.query(`
      INSERT INTO reviews (product_id, customer_name, rating, review_text)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `, [product_id, customer_name, rating, review_text]);
    
    res.status(201).json({
      success: true,
      data: {
        id: result.rows[0].id,
        message: 'Review submitted successfully. It will be visible after approval.',
        created_at: result.rows[0].created_at
      }
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit review'
    });
  } finally {
    client.release();
  }
});

// Mark review as helpful
app.post('/api/reviews/:reviewId/helpful', async (req, res) => {
  const { reviewId } = req.params;
  const client = await pool.connect();
  try {
    const result = await client.query(`
      UPDATE reviews 
      SET helpful_votes = helpful_votes + 1
      WHERE id = $1
      RETURNING helpful_votes
    `, [reviewId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        helpful_votes: result.rows[0].helpful_votes
      }
    });
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update review'
    });
  } finally {
    client.release();
  }
});

// Get store locations
app.get('/api/stores', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT id, name, address, phone, email, latitude, longitude
      FROM stores
      WHERE is_active = true
      ORDER BY name
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stores'
    });
  } finally {
    client.release();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Simple Reviews API server running on port ${PORT}`);
});
