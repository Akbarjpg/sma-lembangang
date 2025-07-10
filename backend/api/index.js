const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// CORS Configuration untuk production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      process.env.FRONTEND_URL,
      // Add your Vercel frontend URL here
      // 'https://your-frontend-app.vercel.app'
    ].filter(Boolean);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
} else {
  console.error('❌ MONGO_URI environment variable not set');
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'SMA Web Backend API',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      test: '/api/test',
      ping: '/api/ping',
      auth: '/api/auth/*',
      admin: '/api/admin/*',
      kontak: '/api/kontak/*'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI ? 'Set' : 'Not Set'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Import routes
try {
  const authRoutes = require('../routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded');
} catch(e) {
  console.error('❌ Failed to load auth routes:', e);
}

try {
  const adminRoutes = require('../routes/admin');
  app.use('/api/admin', adminRoutes);
  console.log('✅ Admin routes loaded');
} catch(e) {
  console.error('❌ Failed to load admin routes:', e);
}

try {
  const kontakRouter = require('../routes/kontak');
  app.use('/api/kontak', kontakRouter);
  console.log('✅ Kontak routes loaded');
} catch(e) {
  console.error('❌ Failed to load kontak routes:', e);
}

// Ping endpoint for health check
app.get('/api/ping', (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "Server is running"
  });
});

// Dashboard Route
app.get('/api/dashboard', (req, res) => {
  res.json({ message: 'Selamat datang di dashboard rahasia 🎉' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ 
    status: "error", 
    message: "Endpoint tidak ditemukan", 
    method: req.method, 
    path: req.path 
  });
});

module.exports = app;