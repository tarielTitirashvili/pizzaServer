"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = require('../models/user');
const router = (0, express_1.default)();
// api/auth
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, last_name: lastName, email, password, token } = req.body;
        if (!(name && lastName && email && password)) {
            res.status(400).send('all inputs are required!!!');
        }
        // check email in DB
        const oldUser = yield User.findOne({ email });
        if (oldUser) {
            return res.status(400).send('user with this email already exist!');
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User.create({
            name,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const newToken = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.tokenKey, {
            expiresIn: '2h',
        });
        user.token = token;
        console.log(newToken);
        res.status(201).json(user);
    }
    catch (e) {
        console.log(e);
    }
}));
router.post('/login', (req, res) => { });
module.exports = router;
