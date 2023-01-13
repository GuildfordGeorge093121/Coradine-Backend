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
const userVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken } = req.query;
    // Verify if access token exist
    if (!accessToken) {
        if (!refreshToken)
            return res.status(401).json({ verified: false });
    }
    try {
        const userDecoded = yield jsonwebtoken_1.default.verify(accessToken, envir_1.default.ACCESS_KEY_SECRET);
        return res.status(200).json({ verified: true, token: { accessToken, refreshToken } });
    }
    catch (error) {
        console.log('Check for refresh token');
        next();
    }
});
exports.default = userVerification;
