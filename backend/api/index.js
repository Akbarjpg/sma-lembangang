const express = require('express');
const app = express();

// Minimal middleware
app.use(express.json());

// Default route ping (cek api hidup)
app.get('/api/ping', (req, res) => res.json({status: "ok", message: "Serverless function berjalan di Vercel"}));

// Agar Vercel dapat menjalankan express sebagai serverless function
module.exports = app;
