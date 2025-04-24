const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Coba satu router dulu
try {
    const authRoutes = require('../routes/auth');
    app.use('/api/auth', authRoutes);
} catch(e) {
    console.error('Gagal import authRoutes:', e);
}

// Ping supaya tetap bisa diakses
app.get('/api/ping', (req, res) =>
  res.json({ status: "ok" }));


app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan", method: req.method, path: req.path });
});
module.exports = app;