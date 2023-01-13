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
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { session_refresh_token } = req.body;
    try {
        // Check if refresh and acccess token exist in the database
        const foundUser = yield (0, db_1.default)('SELECT * FROM users WHERE refreshtoken= $1', [session_refresh_token]);
        if (foundUser.rows.length === 0)
            return res.status(409).json({ status: 'error', message: 'You are already logged out' });
        const userDecoded = yield jsonwebtoken_1.default.verify(session_refresh_token, envir_1.default.REFRESH_KEY_SECRET);
        // deleting access and refresh token from server
        const updateDB = yield (0, db_1.default)('UPDATE users SET refreshtoken= NULL, accesstoken= NULL WHERE email= $1', [userDecoded.email]);
        res.status(200).json({ status: 'ok', message: 'Loggout' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error });
    }
});
exports.default = logout;
