/* /backend/routes/kontak.js */
const express = require('express');
const router = express.Router();
const KontakController = require('../controller/KontakController');

// POST /api/kontak
router.post('/', KontakController.kirimPesan);

// (Optional: you can add GET for admin listing in the future)
module.exports = router;