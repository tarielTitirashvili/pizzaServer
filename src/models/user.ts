import mongoose from 'mongoose';
import { ModelUser } from '../interfaces/user';

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, unique: true, require: true, sparse: true },
  password: { type: String, require: true },
  role: { type: String, default: 'USER' },
});

export default mongoose.model<ModelUser>('User', userSchema);
