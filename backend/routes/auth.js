const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Pastikan model User sudah benar
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login Endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login endpoint dipanggil');

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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
  console.log('Login endpoint dipanggil');
});
console.log('Login endpoint dipanggil');

module.exports = router;
