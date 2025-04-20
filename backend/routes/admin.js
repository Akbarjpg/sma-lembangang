const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Model
const FeatureImage = require('../models/FeatureImage');
const Berita = require('../models/Berita');
const Pengumuman = require('../models/Pengumuman');
const JadwalUjian = require('../models/JadwalUjian'); // Pastikan nama model konsisten
const Ekstrakulikuler = require('../models/Ekstrakulikuler');

// Konfigurasi Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder tempat file disimpan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diizinkan'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

router.get('/protected', auth, (req, res) => {
    res.json({ message: 'Anda berhasil mengakses rute yang dilindungi!', user: req.user });
  });

// -- FEATURE IMAGE --
router.put('/feature-image/:featureName', auth, upload.single('image'), async (req, res) => {
  try {
    const feature = await FeatureImage.findOneAndUpdate(
      { featureName: req.params.featureName },
      { imageUrl: '/uploads/' + req.file.filename },
      { new: true, upsert: true }
    );
    res.json(feature);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating feature image',
      error: error.message 
    });
  }
});

// -- BERITA --
router.post('/berita', auth, async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    // Validasi input
    if (!title || !content || !imageUrl) {
      return res.status(400).json({ message: 'Title, content, dan imageUrl harus diisi' });
    }

    const berita = new Berita({
      title,
      content,
      imageUrl,
    });

    await berita.save();
    res.status(201).json(berita);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating berita',
      error: error.message 
    });
  }
});

router.put('/berita/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }

    // Hapus gambar lama jika ada gambar baru
    if (req.file && berita.imageUrl) {
      const oldImage = path.join(__dirname, '../uploads', berita.imageUrl.split('/').pop());
      fs.unlink(oldImage, (err) => {
        if (err) console.error('Gagal hapus gambar lama:', err);
      });
    }

    const updateData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file ? '/uploads/' + req.file.filename : berita.imageUrl
    };

    const updated = await Berita.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating berita',
      error: error.message 
    });
  }
});

router.get('/berita', auth, async (req, res) => {
  try {
    const berita = await Berita.find();
    res.json(berita);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching berita',
      error: error.message 
    });
  }
});

router.delete('/berita/:id', auth, async (req, res) => {
  try {
    const berita = await Berita.findByIdAndDelete(req.params.id);
    if (!berita) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }

    // Hapus gambar terkait
    if (berita.imageUrl) {
      const imagePath = path.join(__dirname, '../uploads', berita.imageUrl.split('/').pop());
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Gagal menghapus gambar:', err);
      });
    }

    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting data',
      error: error.message 
    });
  }
});


// -- PENGUMUMAN --
router.post('/pengumuman', auth, async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    // Validasi input
    if (!title || !content || !imageUrl) {
      return res.status(400).json({ message: 'Title, content, dan imageUrl harus diisi' });
    }

    const pengumuman = new Pengumuman({
      title,
      content,
      imageUrl,
    });

    await pengumuman.save();
    res.status(201).json(pengumuman);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating pengumuman',
      error: error.message 
    });
  }
});

router.put('/pengumuman/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findById(req.params.id);
    if (!pengumuman) {
      return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
    }

    // Hapus gambar lama jika ada gambar baru
    if (req.file && pengumuman.imageUrl) {
      const oldImage = path.join(__dirname, '../uploads', pengumuman.imageUrl.split('/').pop());
      fs.unlink(oldImage, (err) => {
        if (err) console.error('Gagal hapus gambar lama:', err);
      });
    }

    const updateData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file ? '/uploads/' + req.file.filename : pengumuman.imageUrl
    };

    const updated = await Pengumuman.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating pengumuman',
      error: error.message 
    });
  }
});


router.delete('/pengumuman/:id', auth, async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findByIdAndDelete(req.params.id);
    if (!pengumuman) {
      return res.status(404).json({ message: 'Pengumuman tidak ditemukan' });
    }

    // Hapus gambar terkait
    if (pengumuman.imageUrl) {
      const imagePath = path.join(__dirname, '../uploads', pengumuman.imageUrl.split('/').pop());
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Gagal menghapus gambar:', err);
      });
    }

    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting data',
      error: error.message 
    });
  }
});

router.get('/pengumuman', auth, async (req, res) => {
  try {
    const pengumuman = await Pengumuman.find();
    res.json(pengumuman);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching pengumuman',
      error: error.message 
    });
  }
});

// -- JADWAL UJIAN --
router.post('/jadwal', async (req, res) => {
  try {
    const { tanggal, mataPelajaran, kelas, jamMulai, jamSelesai } = req.body;

    if(!tanggal || !mataPelajaran || !kelas || !jamMulai || !jamSelesai) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const jadwal = new JadwalUjian({
      tanggal,
      mataPelajaran,
      kelas,
      jamMulai,
      jamSelesai
    });

    await jadwal.save();
    res.status(201).json(jadwal);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating jadwal ujian',
      error: error.message 
    });
  }
});

router.get('/jadwal', async (req, res) => {
  try {
    const jadwal = await JadwalUjian.find();
    res.json(jadwal);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching jadwal ujian',
      error: error.message 
    });
  }
});

router.put('/jadwal/:id', async (req, res) => {
  try {
    const { tanggal, mataPelajaran, kelas, jamMulai, jamSelesai } = req.body;

    const jadwal = await JadwalUjian.findByIdAndUpdate(
      req.params.id,
      { tanggal, mataPelajaran, kelas, jamMulai, jamSelesai },
      { new: true }
    );

    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal ujian tidak ditemukan' });
    }

    res.json(jadwal);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating jadwal ujian',
      error: error.message 
    });
  }
});

// -- EKSTRAKURIKULER --
router.post('/ekstrakulikuler', auth, upload.single('image'), async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log untuk memeriksa body
    console.log('Uploaded File:', req.file); // Log untuk memeriksa file yang diunggah

    const { nama, deskripsi } = req.body;

    if (!nama || !deskripsi) {
      return res.status(400).json({ message: 'Nama dan deskripsi harus diisi' });
    }

    const ekskul = new Ekstrakulikuler({
      nama,
      deskripsi,
      imageUrl: req.file ? '/uploads/' + req.file.filename : null,
    });

    await ekskul.save();
    res.status(201).json(ekskul);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating ekstrakulikuler',
      error: error.message 
    });
  }
});

router.delete('/ekstrakulikuler/:id', auth, async (req, res) => {
  try {
    const ekskul = await Ekstrakulikuler.findByIdAndDelete(req.params.id);
    if (!ekskul) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    // Hapus gambar terkait
    if (ekskul.imageUrl) {
      const imagePath = path.join(__dirname, '../uploads', ekskul.imageUrl.split('/').pop());
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Gagal menghapus gambar:', err);
      });
    }

    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting data',
      error: error.message 
    });
  }
});

module.exports = router;