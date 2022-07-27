"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryControllers_1 = __importDefault(require("../controllers/categoryControllers"));
const role_middleware_1 = __importDefault(require("../middleware/role.middleware"));
const router = (0, express_1.Router)();
// api/category
router.get('/', categoryControllers_1.default.getAll);
router.post('/:category', role_middleware_1.default, categoryControllers_1.default.create);
router.delete('/:category', role_middleware_1.default, categoryControllers_1.default.deleteCategory);
router.put('/:category/:id', role_middleware_1.default, categoryControllers_1.default.addProduct);
module.exports = router;
