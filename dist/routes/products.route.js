"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const router = (0, express_1.Router)();
// api/auth
router.get('/product', userControllers_1.default.allUsers);
router.post('/product', role_middleware_1.default, userControllers_1.default.registration);
router.put('/product', role_middleware_1.default, userControllers_1.default.registration);
router.delete('/product', role_middleware_1.default, userControllers_1.default.login);
module.exports = router;
