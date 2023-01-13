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
const refreshAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.query;
    console.log(refreshToken);
    try {
        console.log('refreshing token');
        const searchUser = yield (0, db_1.default)('SELECT email, userrole FROM users WHERE refreshtoken = $1', [refreshToken]);
        if (searchUser.rowCount === 0)
            return res.status(401).json({ verified: false });
        const email = searchUser.rows[0].email;
        const role = searchUser.rows[0].userrole;
        const verifyRefreshToken = yield jsonwebtoken_1.default.verify(refreshToken, envir_1.default.REFRESH_KEY_SECRET);
        const accessToken = yield jsonwebtoken_1.default.sign({ email, role }, envir_1.default.ACCESS_KEY_SECRET);
        return res.status(200).json({ verified: true, token: { accessToken, refreshToken } });
    }
    catch (error) {
        res.status(401).json({ verified: false });
    }
});
exports.default = refreshAccessToken;
