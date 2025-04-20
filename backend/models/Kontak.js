const mongoose = require('mongoose');

const kontakSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pesan: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Kontak', kontakSchema);
