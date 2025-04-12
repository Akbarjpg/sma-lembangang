const express = require('express');
const router = express.Router();
const FeatureImage = require('../models/FeatureImage');
const Berita = require('../models/Berita');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const fs = require('fs');
const Pengumuman = require('../models/Pengumuman');
const jadwal = require('../models/JadwalUjian');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to upload a feature image
router.post('/feature-image/:featureName', auth, upload.single('image'), async (req, res) => {
    try {
        const feature = await FeatureImage.findOnaAndUpdate(
            { featureName: req.params.featureName },
            { imageUrl: '/uploads/' + req.file.filename },
            { new: true, upsert: true }
        );
        res.json(feature);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
});
// Route to get a feature image
router.get('/feature-image/:featureName', auth, async (req, res) => {
    try {
        const feature = await FeatureImage.findOne({ featureName: req.params.featureName });
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.json(feature);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image', error });
    }
});
// Route to delete a feature image
router.delete('/feature-image/:featureName', auth, async (req, res) => {
    try {
        const feature = await FeatureImage.findOneAndDelete({ featureName: req.params.featureName });
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        // Optionally, delete the image file from the server
        const imagePath = path.join(__dirname, '..', feature.imageUrl);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });
        res.json({ message: 'Feature image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting image', error });
    }
});

// CRUD operations for berita
router.post('/berita', auth, upload.single('image'), async (req, res) => {
    try {
        const berita = new Berita({
            title: req.body.title,
            content: req.body.content,
            imageUrl: '/uploads/' + req.file.filename
        });
        await berita.save();
        res.status(201).json(berita);
    } catch (error) {
        res.status(500).json({ message: 'Error creating berita', error });
    }
});

// CRUD to add, update, delete berita
router.get('/berita', auth, async (req, res) => {
    try {
        const berita = await Berita.find();
        res.json(berita);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching berita', error });
    }
});

router.get('/berita/:id', auth, async (req, res) => {
    try {
        const berita = await Berita.findById(req.params.id);
        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }
        res.json(berita);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching berita', error });
    }
});

router.put('/berita/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            content: req.body.content
        };
        if (req.file) {
            updateData.imageUrl = '/uploads/' + req.file.filename;
        }
        const berita = await Berita.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }
        res.json(berita);
    } catch (error) {
        res.status(500).json({ message: 'Error updating berita', error });
    }
});

router.delete('/berita/:id', auth, async (req, res) => {
    try {
        const berita = await Berita.findByIdAndDelete(req.params.id);
        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }
        // Optionally, delete the image file from the server
        const imagePath = path.join(__dirname, '..', berita.imageUrl);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });
        res.json({ message: 'Berita deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting berita', error });
    }
});
// CRUD operations for Pengumuman

router.post('/pengumuman', auth, upload.single('image'), async (req, res) => {
    try {
        const pengumuman = new Pengumuman({
            title: req.body.title,
            content: req.body.content,
            imageUrl: '/uploads/' + req.file.filename
        });
        await pengumuman.save();
        res.status(201).json(pengumuman);
    } catch (error) {
        res.status(500).json({ message: 'Error creating pengumuman', error });
    }
});
// CRUD to add, update, delete pengumuman
router.get('/pengumuman', auth, async (req, res) => {
    try {
        const pengumuman = await Pengumuman.find();
        res.json(pengumuman);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pengumuman', error });
    }
});

router.get('/pengumuman/:id', auth, async (req, res) => {
    try {
        const pengumuman = await Pengumuman.findById(req.params.id);
        if (!pengumuman) {
            return res.status(404).json({ message: 'Pengumuman not found' });
        }
        res.json(pengumuman);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pengumuman', error });
    }
});

router.put('/pengumuman/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            content: req.body.content
        };
        if (req.file) {
            updateData.imageUrl = '/uploads/' + req.file.filename;
        }
        const pengumuman = await Pengumuman.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!pengumuman) {
            return res.status(404).json({ message: 'Pengumuman not found' });
        }
        res.json(pengumuman);
    } catch (error) {
        res.status(500).json({ message: 'Error updating pengumuman', error });
    }
}); 

router.delete('/pengumuman/:id', auth, async (req, res) => {
    try {
        const pengumuman = await Pengumuman.findByIdAndDelete(req.params.id);
        if (!pengumuman) {
            return res.status(404).json({ message: 'Pengumuman not found' });
        }
        // Optionally, delete the image file from the server
        const imagePath = path.join(__dirname, '..', pengumuman.imageUrl);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
            }
        });
        res.json({ message: 'Pengumuman deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pengumuman', error });
    }
});

// CRUD operations for Jadwal Ujian

module.exports = router;
// Note: Ensure to handle errors properly and validate inputs as per your requirements.