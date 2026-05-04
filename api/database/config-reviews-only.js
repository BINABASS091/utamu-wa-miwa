// Neon PostgreSQL Database Configuration - Reviews Only
import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pkg;

// Connection configuration for Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  max: 5, // Reduced max connections
  connectionTimeoutMillis: 30000, // Increased timeout
  idleTimeoutMillis: 60000,
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

export { pool, testConnection };
