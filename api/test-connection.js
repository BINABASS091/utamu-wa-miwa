// Test database connection script
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load .env from parent directory
dotenv.config({ path: '../.env' });

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Test different SSL configurations
const configs = [
  {
    name: 'SSL: true',
    ssl: true
  },
  {
    name: 'SSL: {rejectUnauthorized: false}',
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'SSL: false',
    ssl: false
  },
  {
    name: 'No SSL config',
    ssl: undefined
  }
];

async function testConnection(config) {
  console.log(`\nTesting: ${config.name}`);
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: config.ssl,
      max: 1,
      connectionTimeoutMillis: 5000,
    });
    
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    await pool.end();
    
    console.log('SUCCESS: Connection established');
    return true;
  } catch (error) {
    console.log('FAILED:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('Testing database connection configurations...\n');
  
  for (const config of configs) {
    const success = await testConnection(config);
    if (success) {
      console.log(`\nFound working configuration: ${config.name}`);
      break;
    }
  }
}

runTests().catch(console.error);
