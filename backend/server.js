require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

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
const adminRoutes = require('./routes/admin');
const auth = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const beritaRoutes = require('./routes/berita');
const pengumumanRoutes = require('./routes/pengumuman');

app.use('/api/admin', auth, adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/pengumuman', pengumumanRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});