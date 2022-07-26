import { Schema, model } from 'mongoose';
import { TCategory } from '../interfaces/category';

const category = new Schema({
  category: { type: String, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

export default model<TCategory>('Category', category);
