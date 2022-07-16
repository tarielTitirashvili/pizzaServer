import mongoose from 'mongoose';
import { ModelUser } from '../interfaces/user';

const validateEmail = (value: string) => {
  let pos = value.indexOf('@');
  if (pos !== -1 && value.includes('.')) {
    let dotPos: number = 0;
    value.split('').forEach((char, i) => {
      if (char === '.') dotPos = i;
    });
    if (pos < dotPos && dotPos - pos <= 1) {
      throw new Error('Email is invalid');
    }
  } else {
    throw new Error('email is invalid');
  }
};

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: {
    type: String,
    unique: true,
    require: true,
    sparse: true,
    validate(value: string) {
      validateEmail(value);
    },
  },
  password: { type: String, require: true },
  role: { type: String, default: 'USER' },
});

export default mongoose.model<ModelUser>('User', userSchema);
