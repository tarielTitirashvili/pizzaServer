import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  images: [String],
  title: { type: String },
  category: { type: String },
  rating: { type: Number },
  price: { type: Number },
  types: [String],
  sizes: [Number],
  quantity: { type: Number },
});

export default mongoose.model('Product', productSchema);
