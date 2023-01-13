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
const db_1 = __importDefault(require("../db/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_1 = require("http");
const generationToken_1 = __importDefault(require("../config/generationToken"));
const emailValidation_1 = __importDefault(require("../config/emailValidation"));
const authController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //  Check for empty input fields
    if (!email || !password)
        return res.status(401).json({ status: 'error', message: "Missing credential" });
    if (!(0, emailValidation_1.default)(email))
        return res.status(400).json({ status: 'error', message: "Incorrect email" });
    try {
        // Check in the user exist
        const foundUser = yield (0, db_1.default)('SELECT * FROM users WHERE email= $1', [email]);
        if (foundUser.rows.length == 0)
            return res.status(401).json({ status: 'error', message: 'Account does not exist. Try registering account' });
        // User found 
        // Decrypt Password
        const matchPassword = yield bcrypt_1.default.compare(password, foundUser.rows[0].password);
        if (!matchPassword)
            return res.status(401).json({ status: 'error', message: 'Incorrect Password' });
        // Password Match
        // Create New  access token and refresh toke
        const role = foundUser.rows[0].userrole;
        const tokens = yield (0, generationToken_1.default)({ email, role });
        // Insert new tokens
        const newUser = yield (0, db_1.default)('UPDATE users SET accessToken= $1, refreshtoken= $2  WHERE email= $3', [tokens.accessToken, tokens.refreshToken, foundUser.rows[0].email]);
        if (newUser.rowCount == 0)
            return res.status(500).json({ status: 'error', message: http_1.STATUS_CODES[500] });
        // sending access token
        //  res.cookie('session_access_token', accessToken, 
        // {
        //     httpOnly: false,
        //     maxAge: 15*60*1000,
        //     sameSite: "none",
        //     domain: 'http://localhost:3000/',
        //     path: 'http://localhost:4000/'
        // })
        // sending refresh token
        // res.cookie('session_refresh_token', refreshToken, 
        // {
        //     httpOnly:false,
        //     maxAge: 24*60*60*1000,
        //     sameSite: "none",
        //     domain: 'http://localhost:3000/',
        //     path: 'http://localhost:4000/'
        // })
        res.status(201).json({ status: 'ok', token: tokens });
    }
    catch (error) {
        console.log(`Server error`);
        res.status(500).json({ status: 'error', message: http_1.STATUS_CODES[500] });
    }
});
exports.default = authController;
