"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const typeSchema = new mongoose_1.default.Schema({
    type: { type: String },
});
const sizeSchema = new mongoose_1.default.Schema({
    size: { type: Number },
});
const imagesSchema = new mongoose_1.default.Schema({
    image: { type: String },
});
const productSchema = new mongoose_1.default.Schema({
    images: [imagesSchema],
    title: { type: String },
    category: { type: String },
    rating: { type: Number },
    price: { type: Number },
    types: [typeSchema],
    sizes: [sizeSchema],
    quantity: { type: Number },
});
exports.default = mongoose_1.default.model('Product', productSchema);
