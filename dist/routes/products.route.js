"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const router = (0, express_1.Router)();
// api/auth
router.get('/product', userControllers_1.default.allUsers);
router.post('/product', userControllers_1.default.registration);
router.put('/product', userControllers_1.default.registration);
router.delete('/product', userControllers_1.default.login);
module.exports = router;
