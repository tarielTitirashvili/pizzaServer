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
const generateToken = (_id, name, last_name, email, role) => {
    return jsonwebtoken_1.default.sign({ _id, name, last_name, email, role }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '4h',
    });
};
const validateToken = (req, res) => {
    const user = res.locals.jwt;
    console.log(user);
    res.json({ message: 'Token is validated', user });
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({ message: 'all fields are required' });
        }
        const user = yield user_1.default.findOne({ email });
        if (user !== null) {
            const checkPass = yield bcryptjs_1.default.compare(password, user.password);
            if (checkPass && email === user.email) {
                const { name, email: regEmail, last_name, _id, role } = user;
                const token = generateToken(_id, name, last_name, regEmail, role);
                return res.status(200).json({ user, token: token });
            }
        }
        res.status(400).json({ message: 'one of inputs is invalid' });
    }
    catch (e) {
        console.log(e);
    }
});
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, last_name: lastName, email, password, role } = req.body;
        if (!(name && lastName && email && password)) {
            res.status(400).json({ message: 'all inputs are required!!!' });
        }
        // check email in DB
        const oldUser = yield user_1.default.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: 'user with this email already exist!' });
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            name,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role,
        });
        const { _id, email: userEmail, role: userRole, name: userName, last_name } = user;
        const newToken = generateToken(_id, userName, last_name, userEmail, userRole);
        user.token = newToken;
        res.status(201).json(user);
    }
    catch (e) {
        res.json({ e });
    }
});
const allUsers = (req, res) => {
    try {
        user_1.default.find()
            .select('-password')
            .select('-role')
            .exec()
            .then((users) => {
            res.json({
                users,
                count: users.length,
            });
        });
    }
    catch (e) {
        res.json({
            message: "could't get users",
            e,
        });
    }
};
exports.default = {
    validateToken,
    login,
    registration,
    allUsers,
};
