const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Test endpoint
router.post('/test-hello', (req, res) => res.json({ok: true, pesan: 'Router aktif'}));

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', { username: req.body.username, timestamp: new Date().toISOString() });
    
    const { username, password } = req.body;
    
    // Validasi input
    if (!username || !password) {
      console.log('Login failed: Missing credentials');
      return res.status(400).json({ message: 'Username dan password wajib diisi.' });
    }

    // Cari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Login failed: User not found -', username);
      return res.status(401).json({ message: 'Username atau password salah.' });
    }

    // Validasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Invalid password for user -', username);
      return res.status(401).json({ message: 'Username atau password salah.' });
    }

    // Generate JWT
    const payload = { userId: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    console.log('Login successful for user:', username);
    
    // Kirim respons sukses
    res.json({
      message: 'Login berhasil',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

module.exports = router;
