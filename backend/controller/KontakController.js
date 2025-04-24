/* /backend/controller/KontakController.js */
const Kontak = require('../models/Kontak');

// Save a new contact message
exports.kirimPesan = async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;
    const kontak = new Kontak({ nama, email, pesan });
    await kontak.save();
    res.status(201).json({ message: 'Pesan berhasil dikirim', data: kontak });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengirim pesan', error: error.message });
  }
};