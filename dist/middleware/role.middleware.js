"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckToken_1 = __importDefault(require("../functions/CheckToken"));
const checkRoleMiddleware = (req, res, next) => {
    const reqToken = req.body.token || req.query.token || req.headers['authentication'];
    if (!reqToken) {
        return res.status(403).json({ message: 'authentication is required to get all users' });
    }
    try {
        const user = (0, CheckToken_1.default)(reqToken);
        if (user) {
            if (user.role === 'ADMIN') {
                res.locals.jwt = user;
            }
            else {
                return res.json({ message: 'Access is restricted' });
            }
        }
    }
    catch (e) {
        return res.status(401).json({ e });
    }
    return next();
};
exports.default = checkRoleMiddleware;
