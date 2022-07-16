"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function CheckToken(reqToken) {
    const token = reqToken.split(' ')[1];
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                throw new Error('Unauthorized');
            }
            else {
                if (user !== undefined) {
                    return user;
                }
            }
        });
        if (user !== undefined && typeof user !== 'string') {
            return user;
        }
    }
    catch (err) {
        throw new Error('Unauthorized');
    }
}
exports.default = CheckToken;
