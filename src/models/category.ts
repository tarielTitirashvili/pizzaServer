import mongoose from 'mongoose';
import { TCategory } from '../interfaces/category';

const category = new mongoose.Schema({
  category: { type: String, unique: true },
  products: [String],
});

export default mongoose.model<TCategory>('Product', category);
