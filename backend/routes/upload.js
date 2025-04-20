const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diizinkan (JPEG, PNG, GIF, WEBP)'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: fileFilter
});

router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(201).json({
      success: true,
      message: 'File berhasil diunggah',
      url: fileUrl
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
});

router.delete('/image/:filename', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(404).json({ error: 'File tidak ditemukan' });
      }
      res.json({ success: true, message: 'File berhasil dihapus' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/image/:filename', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
    }

    const oldFilePath = path.join(__dirname, '../uploads', req.params.filename);
    
    fs.unlink(oldFilePath, (err) => {
      if (err) {
        return res.status(404).json({ error: 'File tidak ditemukan' });
      }
      const newFileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      res.status(200).json({
        success: true,
        message: 'File berhasil diperbarui',
        url: newFileUrl
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

  
});

module.exports = router;