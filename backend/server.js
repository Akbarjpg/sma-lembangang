const express = require('express');
require('dotenv').config(); // Hanya panggil dotenv sekali
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Pastikan cors diimpor

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
const adminRoutes = require('./routes/admin'); // Semua rute ada di admin.js
app.use('/api/admin', adminRoutes); // Tidak perlu middleware auth di sini jika sudah diatur di admin.js

// Dashboard Route
app.get('/api/dashboard', (req, res) => {
    res.json({ message: 'Selamat datang di dashboard rahasia 🎉' });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});