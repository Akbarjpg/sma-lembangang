const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored as hash
  role: { type: String, enum: ['admin', 'guru'], default: 'guru' }, // NEW: Role field
});

module.exports = mongoose.model('User', userSchema);