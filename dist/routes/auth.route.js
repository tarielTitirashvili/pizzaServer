"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_token_middleware_1 = __importDefault(require("../middleware/auth.token.middleware"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
console.log(userControllers_1.default.validateToken);
const router = (0, express_1.Router)();
// api/auth
router.post('/', auth_token_middleware_1.default, userControllers_1.default.validateToken);
router.post('/register', userControllers_1.default.registration);
router.post('/login', userControllers_1.default.login);
module.exports = router;
