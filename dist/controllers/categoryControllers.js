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
const category_1 = __importDefault(require("../models/category"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        res.json({
            message: "could't get users",
            e,
        });
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = req.params.category;
    try {
        const createdCategory = yield category_1.default.create({
            category: newCategory,
        });
        res.status(200).json({
            createdCategory,
        });
    }
    catch (e) {
        res.json({ message: "couldn't create category", e });
    }
});
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    try {
        const deletedCategory = yield category_1.default.findOneAndDelete({
            category: category,
        });
        if (deleteCategory !== null) {
            res.status(200).json({
                deletedCategory,
            });
        }
    }
    catch (e) {
        res.json({ message: "couldn't delete category", e });
    }
});
exports.default = {
    getAll,
    create,
    deleteCategory,
};
