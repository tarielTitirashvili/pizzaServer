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
const user_1 = __importDefault(require("../models/user"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.find()
            .select('-password')
            .select('-role')
            .exec()
            .then((users) => {
            res.json({
                users,
                count: users.length,
            });
        });
    }
    catch (e) {
        res.json({
            message: "could't get users",
            e,
        });
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, last_name: lastName, email, password, role } = req.body;
        if (!(name && lastName && email && password)) {
            res.status(400).json({ message: 'all inputs are required!!!' });
        }
        // check email in DB
    }
    catch (e) {
        res.json({ e });
    }
});
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.default.findOneAndDelete({ email: req.params.email });
        return res.json({ deletedUser });
    }
    catch (e) {
        res.json({
            message: 'delete was unsuccessful',
            e,
        });
    }
});
exports.default = {
    getAll,
    create,
    deleteCategory,
};
