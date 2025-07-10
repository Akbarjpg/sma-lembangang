const dotenv = require('dotenv');
dotenv.config();

console.log('Environment Variables Check:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set (length: ' + process.env.MONGO_URI.length + ')' : 'Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set (length: ' + process.env.JWT_SECRET.length + ')' : 'Not Set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'Not Set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not Set');
console.log('PORT:', process.env.PORT || 'Not Set');

// Test MongoDB connection
const mongoose = require('mongoose');

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log('✅ MongoDB Connection Test: SUCCESS');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Test: FAILED', err.message);
    process.exit(1);
  });
} else {
  console.error('❌ Cannot test MongoDB: MONGO_URI not set');
  process.exit(1);
}
