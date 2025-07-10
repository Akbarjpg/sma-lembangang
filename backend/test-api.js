// Simple test to verify API setup
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing API Setup...');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not Set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Test loading the API
try {
  const app = require('./api/index.js');
  console.log('✅ API loaded successfully');
  
  // Test basic endpoints
  const request = require('http').get('http://localhost:3000/', (res) => {
    console.log('✅ Root endpoint test passed');
  });
  
} catch (error) {
  console.error('❌ API loading failed:', error.message);
}

setTimeout(() => {
  console.log('Test completed');
  process.exit(0);
}, 2000);
