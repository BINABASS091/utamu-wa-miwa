// Simple test server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'Configured' : 'Not configured'
  });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const { Pool } = await import('pg');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
      max: 1,
      connectionTimeoutMillis: 10000,
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    await pool.end();
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Admin login test
app.post('/api/auth/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { Pool } = await import('pg');
    const bcrypt = await import('bcryptjs');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
      max: 1,
      connectionTimeoutMillis: 10000,
    });

    const client = await pool.connect();
    
    const result = await client.query(`
      SELECT id, email, password_hash, name, role
      FROM users
      WHERE email = $1 AND role = 'admin' AND is_active = true
    `, [email]);

    if (result.rows.length === 0) {
      client.release();
      await pool.end();
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    const admin = result.rows[0];
    const isValidPassword = await bcrypt.default.compare(password, admin.password_hash);
    
    if (!isValidPassword) {
      client.release();
      await pool.end();
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    client.release();
    await pool.end();
    
    res.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name
        },
        message: 'Admin login successful!'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Customer login test
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { Pool } = await import('pg');
    const bcrypt = await import('bcryptjs');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
      max: 1,
      connectionTimeoutMillis: 10000,
    });

    const client = await pool.connect();
    
    const result = await client.query(`
      SELECT id, email, password_hash, name, role
      FROM users
      WHERE email = $1 AND is_active = true
    `, [email]);

    if (result.rows.length === 0) {
      client.release();
      await pool.end();
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.default.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      client.release();
      await pool.end();
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    client.release();
    await pool.end();
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        message: 'Customer login successful!'
      }
    });
  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Simple test server running on port ${PORT}`);
});
