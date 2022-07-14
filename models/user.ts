import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true, require: true, sparse: true },
  password: { type: String },
  token: { type: String },
  role: { type: String, default: 'USER' },
});

module.exports = mongoose.model('User', userSchema);
