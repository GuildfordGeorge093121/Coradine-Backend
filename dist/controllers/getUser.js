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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envir_1 = __importDefault(require("../config/envir"));
const db_1 = __importDefault(require("../db/db"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.params;
    try {
        const decodedUser = yield jsonwebtoken_1.default.verify(accessToken, envir_1.default.ACCESS_KEY_SECRET);
        const currentUser = yield (0, db_1.default)('SELECT firstname FROM users WHERE email = $1 AND userrole= $2', [decodedUser.email, decodedUser.role]);
        if (currentUser.rows.length === 0)
            return res.sendStatus(500);
        res.status(200).json({ status: 'ok', data: { user: { firstname: currentUser.rows[0].firstname, pic: "" } } });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = getUser;
