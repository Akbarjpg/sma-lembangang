const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashed = await bcrypt.hash('123456', 10);
  await User.create({ username: 'admin', password: hashed });
  console.log('✅ Admin user berhasil dibuat!');
  process.exit();
});
