"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const ReqToken = req.body.token || req.query.token || req.headers['authentication'];
    if (!ReqToken) {
        return res.status(403).send('A token is required for authentication');
    }
    const token = ReqToken.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Unauthorized' });
            }
            else {
                if (user !== undefined) {
                    res.locals.jwt = user;
                    next();
                }
            }
        });
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
};
exports.default = verifyToken;
