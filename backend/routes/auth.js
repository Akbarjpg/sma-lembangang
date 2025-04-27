const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Pastikan model User sudah benar
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login Endpoint
router.post('/test-hello', (req,res)=>res.json({ok:true, pesan:'Router aktif'}));

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password diperlukan!' });
  }

  try {
    // Cari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Periksa password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    // Kirim respons sukses dengan token dan info user
    res.status(200).json({ 
      message: 'Login berhasil!',
      token,
      user: {
        id: user._id,
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
