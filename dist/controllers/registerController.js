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
const emailValidation_1 = __importDefault(require("../config/emailValidation"));
const generationToken_1 = __importDefault(require("../config/generationToken"));
const registerContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        'admin': 2134,
        'user': 5434,
    };
    console.log(req.body);
    try {
        const { firstname, lastname, email, password, userrole } = req.body;
        // Checking for empty and unfilled form inputs or components
        if (!firstname || !lastname || !email || !password || !userrole)
            return res.status(400).json({ status: "error", message: 'Missing Credential' });
        console.log('body check');
        //  checking if the new user already exist
        //  COnfused bewteen 403 and 409
        if (!(0, emailValidation_1.default)(email))
            return res.status(400).json({ status: 'error', message: 'Incorrect Email.' });
        const foundUser = yield (0, db_1.default)('SELECT * FROM users WHERE email= $1', [email]);
        if (foundUser.rows.length != 0)
            return res.status(409).json({ status: "error", message: "Account already exist. Try Login" });
        // Password Encryption
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        console.log('password check');
        // convert user role to give id
        const role = userrole == 'admin' ? user.admin : userrole == 'user' ? user.user : false;
        if (!role)
            return res.status(400).json({ status: "error", message: "Bad Request" });
        // Creating of new user
        const newUser = yield (0, db_1.default)('INSERT INTO users(id,firstname,lastname,email,password,userrole) VALUES (uuid_generate_v4(),$1,$2,$3,$4,$5)', [firstname, lastname, email, hashPassword, role]);
        const tokens = yield (0, generationToken_1.default)({ email, role });
        res.status(201).json({ status: 'ok', data: tokens });
    }
    catch (error) {
        console.log(`Server error`);
        res.status(500).json({ status: 'error', message: error });
    }
});
exports.default = registerContoller;
