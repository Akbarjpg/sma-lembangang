const express = require('express');
require('dotenv').config(); // Hanya panggil dotenv sekali
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./db'); // Pastikan ini adalah jalur yang benar ke file db.js
const cors = require('cors'); // Pastikan cors diimpor
app.use('/public', express.static('public'));

// Koneksi ke MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB Connected');
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//   });

//   console.log('MONGO_URI:', process.env.MONGO_URI);

connectDB(); // Pastikan koneksi DB sudah benar

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static('uploads'));

// Routes
const adminRoutes = require('./routes/admin'); // Semua rute ada di admin.js
app.use('/api/admin', adminRoutes); // Tidak perlu middleware auth di sini jika sudah diatur di admin.js

const authRoutes = require('./routes/auth'); // Import rute auth
app.use('/api/auth', authRoutes); // Daftarkan rute auth

// Dashboard Route
app.get('/api/dashboard', (req, res) => {
    res.json({ message: 'Selamat datang di dashboard rahasia 🎉' });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});