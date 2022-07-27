"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = __importDefault(require("../controllers/productControllers"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const router = (0, express_1.Router)();
// api/product
router.get('/product', productControllers_1.default.getAll);
router.post('/product', role_middleware_1.default, productControllers_1.default.create);
router.put('/product', role_middleware_1.default, productControllers_1.default.getAll);
router.delete('/product', role_middleware_1.default, productControllers_1.default.deleteCategory);
module.exports = router;
