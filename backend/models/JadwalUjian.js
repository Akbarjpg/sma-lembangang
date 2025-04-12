const mongoose = require('mongoose');
const jadwalUjianSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        required: true,
    },
    mataPelajaran: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
    },
    jamMulai: {
        type: String,
        required: true,
    },
    jamSelesai: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('JadwalUjian', jadwalUjianSchema);
// Compare this snippet from backend/models/Agenda.js: