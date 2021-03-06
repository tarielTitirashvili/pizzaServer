"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckToken_1 = __importDefault(require("../functions/CheckToken"));
const verifyToken = (req, res, next) => {
    const reqToken = req.body.token || req.query.token || req.headers['authentication'];
    if (!reqToken) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const user = (0, CheckToken_1.default)(reqToken);
        res.locals.jwt = user;
    }
    catch (e) {
        res.status(401).json({ e });
    }
    return next();
};
exports.default = verifyToken;
