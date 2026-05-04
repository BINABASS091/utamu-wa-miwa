// Authentication API for Utamu wa Miwa
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from './database/config.js';

const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_ROUNDS = 12;

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Middleware to check admin role
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Admin access required' });
  }
  next();
};

// User Registration
export const registerUser = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { email, password, name, phone } = req.body;

    // Check if user already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create user
    const result = await client.query(`
      INSERT INTO users (email, password_hash, name, phone, role)
      VALUES ($1, $2, $3, $4, 'customer')
      RETURNING id, email, name, role, created_at
    `, [email, passwordHash, name, phone]);

    // Create user profile
    await client.query(`
      INSERT INTO user_profiles (user_id, phone)
      VALUES ($1, $2)
    `, [result.rows[0].id]);

    await client.query('COMMIT');

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.rows[0].id, email: result.rows[0].email, role: result.rows[0].role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: result.rows[0],
        token
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    client.release();
  }
};

// User Login
export const loginUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, password } = req.body;

    // Find user
    const result = await client.query(`
      SELECT id, email, password_hash, name, role
      FROM users
      WHERE email = $1 AND is_active = true
    `, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Update last login
    await client.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Create session token (simplified)
    const sessionToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token: sessionToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, password } = req.body;

    // Find admin user
    const result = await client.query(`
      SELECT id, email, password_hash, name
      FROM users
      WHERE email = $1 AND role = 'admin' AND is_active = true
    `, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    const admin = result.rows[0];

    // Compare password
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }

    // Update last login
    await client.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [admin.id]
    );

    // Create admin session token (simplified)
    const sessionToken = jwt.sign(
      { userId: admin.id, email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name
        },
        token: sessionToken
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
};

// Logout
export const logoutUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      // Decode token to get user ID
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Remove user session
      await client.query(`
        DELETE FROM user_sessions WHERE user_id = $1
      `, [decoded.userId]);
    }

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    client.release();
  }
};

// Get current user profile
export const getUserProfile = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user.userId;
    
    const result = await client.query(`
      SELECT 
        u.id, u.email, u.name, u.phone, u.role, u.created_at,
        up.phone, up.address, up.city, up.country, up.preferred_language
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.id = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    client.release();
  }
};
