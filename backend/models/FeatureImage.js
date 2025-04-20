const mongoose = require('mongoose');

const featureImageSchema = new mongoose.Schema({
    featureName: {
        type: String,
        enum : ['Visi-misi', 'Kepala-sekolah', 'tentang-Sekolah'],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('FeatureImage', featureImageSchema);
