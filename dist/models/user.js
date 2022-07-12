"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true, require: true, sparse: true },
    password: { type: String },
    token: { type: String },
});
module.exports = mongoose_1.default.model('User', userSchema);
