const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
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

module.exports = mongoose.model('Berita', beritaSchema);
