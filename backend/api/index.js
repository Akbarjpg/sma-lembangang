const express = require('express');
const cors = require('cors');
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import semua router
const adminRoutes = require('../routes/admin');
const authRoutes = require('../routes/auth');
const kontakRoutes = require('../routes/kontak');
const uploadRoutes = require('../routes/upload');

// Register routers ke endpoint masing-masing
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/kontak', kontakRoutes);
app.use('/api/upload', uploadRoutes);

// Default route ping (cek api hidup)
app.get('/api/ping', (req, res) => res.json({status: "ok", message: "Serverless function berjalan di Vercel"}));

// Agar Vercel dapat menjalankan express sebagai serverless function
module.exports = app;
