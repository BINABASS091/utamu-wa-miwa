// Debug authentication step by step
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001; // Different port to avoid conflicts

app.use(cors());
app.use(express.json());

// Debug admin authentication
app.post('/debug/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Debug: Attempting admin login');
    console.log('Email:', email);
    console.log('Password:', password);
    
    const { Pool } = await import('pg');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
      max: 1,
      connectionTimeoutMillis: 30000,
    });

    console.log('Debug: Connecting to database...');
    const client = await pool.connect();
    console.log('Debug: Connected to database');
    
    console.log('Debug: Querying admin user...');
    const result = await client.query(`
      SELECT id, email, password_hash, name, role
      FROM users
      WHERE email = $1 AND role = 'admin' AND is_active = true
    `, [email]);

    console.log('Debug: Query result:', result.rows.length, 'rows found');
    
    if (result.rows.length === 0) {
      client.release();
      await pool.end();
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid admin credentials',
        debug: 'No admin user found'
      });
    }

    const admin = result.rows[0];
    console.log('Debug: Found admin user:', admin.email);
    console.log('Debug: Stored hash:', admin.password_hash);
    
    console.log('Debug: Comparing password...');
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    console.log('Debug: Password match:', isValidPassword);
    
    if (!isValidPassword) {
      client.release();
      await pool.end();
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid admin credentials',
        debug: 'Password mismatch'
      });
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
        message: 'Admin login successful!',
        debug: 'All checks passed'
      }
    });
  } catch (error) {
    console.error('Debug: Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    });
  }
});

// Test database connection
app.get('/debug/db-test', async (req, res) => {
  try {
    const { Pool } = await import('pg');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
      max: 1,
      connectionTimeoutMillis: 30000,
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    client.release();
    await pool.end();
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Debug: Database test error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
});
