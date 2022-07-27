import mongoose from 'mongoose';
import { IProduct } from '../interfaces/product';

const productSchema = new mongoose.Schema({
  images: [String],
  title: { type: String, require: true },
  category: { type: String },
  rating: { type: Number, default: 0 },
  price: { type: Number },
  types: [String],
  sizes: [Number],
});

export default mongoose.model<IProduct>('Product', productSchema);
