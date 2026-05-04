// Debug environment variables
import dotenv from 'dotenv';

console.log('Loading .env...');
dotenv.config();

console.log('Environment variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not loaded!');
  process.exit(1);
}

// Test connection
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  max: 1,
  connectionTimeoutMillis: 5000,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('SUCCESS:', result.rows[0]);
    client.release();
    await pool.end();
  } catch (error) {
    console.error('FAILED:', error.message);
  }
}

testConnection();
