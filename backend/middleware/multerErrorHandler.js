/**
 * Multer error handling middleware.
 * Place this AFTER all your routes.
 */
function multerErrorHandler (err, req, res, next) {
  if (err) {
    if (err instanceof require('multer').MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ message: 'Upload error: ' + err.message });
    }
    if (err.message && err.message.includes('Hanya file gambar yang diizinkan')) {
      return res.status(400).json({ message: err.message });
    }
    // Otherwise, generic error
    return res.status(500).json({ message: err.message || 'Internal server error.' });
  }
  next();
}

module.exports = multerErrorHandler;