"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const category = new mongoose_1.Schema({
    category: { type: String, unique: true },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
});
exports.default = (0, mongoose_1.model)('Category', category);
