// Test authentication logic without database
import bcrypt from 'bcryptjs';

// Test password comparison
const testPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}`);
  console.log(`Match: ${result}`);
  return result;
};

// Test with our actual hashes
const main = async () => {
  console.log('=== Testing Password Verification ===');
  
  // Test admin password
  const adminHash = '$2a$12$85xrO8RXgAEgnV2o1CAaPO/9ojPh6wNJfnYmrmLEbyZpmaPufuePa';
  const adminResult = await testPassword('admin123', adminHash);
  
  // Test customer password
  const customerHash = '$2a$12$dtznrd.rHPtsLq4ZIZw6ROT2FJL55etSsswmyWfiAZq5Tz226KGEe';
  const customerResult = await testPassword('password123', customerHash);
  
  console.log('\n=== Results ===');
  console.log(`Admin login should work: ${adminResult}`);
  console.log(`Customer login should work: ${customerResult}`);
  
  if (adminResult && customerResult) {
    console.log('\n✅ Password hashes are correct!');
  } else {
    console.log('\n❌ Password hashes need to be updated');
  }
};

main().catch(console.error);
