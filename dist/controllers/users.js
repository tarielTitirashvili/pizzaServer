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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validateToken = (req, res) => {
    const user = res.locals.jwt;
    res.json({ message: 'Token is validated', user });
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send('all fields are required');
        }
        const user = yield user_1.default.findOne({ email });
        if (user !== null) {
            const checkPass = yield bcryptjs_1.default.compare(password, user.password);
            if (checkPass && email === user.email) {
                const { name, email: regEmail, last_name, _id, role } = user;
                const token = jsonwebtoken_1.default.sign({ name, email: regEmail, last_name, _id, role }, process.env.TOKEN_SECRET_KEY, {
                    expiresIn: '2h',
                });
                user.token = token;
                console.log(user.token);
                return res.status(200).send(user);
            }
        }
        res.status(400).send('one of inputs is invalid');
    }
    catch (e) {
        console.log(e);
    }
});
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, last_name: lastName, email, password } = req.body;
        if (!(name && lastName && email && password)) {
            res.status(400).send('all inputs are required!!!');
        }
        // check email in DB
        const oldUser = yield user_1.default.findOne({ email });
        if (oldUser) {
            return res.status(400).send('user with this email already exist!');
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            name,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const { _id, email: userEmail, role, name: userName, last_name } = user;
        const newToken = jsonwebtoken_1.default.sign({ _id, email: userEmail, role, name: userName, last_name }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: '2h',
        });
        user.token = newToken;
        res.status(201).json(user);
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = {
    validateToken,
    login,
    registration,
};
