const mongoose = require('mongoose');

const ekstrakulikulerSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Ekstrakulikuler', ekstrakulikulerSchema);
