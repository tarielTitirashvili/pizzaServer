"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    images: [String],
    title: { type: String },
    category: { type: String },
    rating: { type: Number },
    price: { type: Number },
    types: [String],
    sizes: [Number],
    quantity: { type: Number },
});
exports.default = mongoose_1.default.model('Product', productSchema);
