const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const testAuth = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find the admin user
    const user = await User.findOne({ email: 'parthsarthi2103@restro.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }

    console.log('User found:', user.email);
    console.log('Password in DB:', user.password);
    console.log('Password length:', user.password.length);
    console.log('Is hashed? (bcrypt hashes start with $2):', user.password.startsWith('$2'));
    
    console.log('\n--- Testing password matching ---');
    
    // Test correct password
    const correctMatch = await user.matchPassword('admin123');
    console.log('Correct password (admin123):', correctMatch ? '✅ MATCHED' : '❌ FAILED');
    
    // Test wrong password
    const wrongMatch = await user.matchPassword('wrongpassword');
    console.log('Wrong password (wrongpassword):', wrongMatch ? '❌ MATCHED (BAD!)' : '✅ REJECTED (GOOD)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testAuth();
