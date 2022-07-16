import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  type: { type: String },
});
const sizeSchema = new mongoose.Schema({
  size: { type: Number },
});
const imagesSchema = new mongoose.Schema({
  image: { type: String },
});
const productSchema = new mongoose.Schema({
  images: [imagesSchema],
  title: { type: String },
  category: { type: String },
  rating: { type: Number },
  price: { type: Number },
  types: [typeSchema],
  sizes: [sizeSchema],
  quantity: { type: Number },
});

export default mongoose.model('Product', productSchema);
