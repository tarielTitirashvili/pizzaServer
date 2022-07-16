"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validateEmail = (value) => {
    let pos = value.indexOf('@');
    if (pos !== -1 && value.includes('.')) {
        let dotPos = 0;
        value.split('').forEach((char, i) => {
            if (char === '.')
                dotPos = i;
        });
        if (pos < dotPos && dotPos - pos <= 1) {
            throw new Error('Email is invalid');
        }
    }
    else {
        throw new Error('email is invalid');
    }
};
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: {
        type: String,
        unique: true,
        require: true,
        sparse: true,
        validate(value) {
            validateEmail(value);
        },
    },
    password: { type: String, require: true },
    role: { type: String, default: 'USER' },
});
exports.default = mongoose_1.default.model('User', userSchema);
