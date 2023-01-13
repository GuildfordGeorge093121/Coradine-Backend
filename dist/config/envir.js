"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const env = {
    ACCESS_KEY_SECRET: process.env.ACCESS_KEY_SECRET || '7e1ad12fdf04513b83676adb06f0bba7cae319f4ec3b74d6ae2314b89e203f0bbefea541679bb5cc144600a5646c48ca2ec3f94f98d811f2983580f54fb5a03f',
    REFRESH_KEY_SECRET: process.env.REFRESH_KEY_SECRET || 'f65590d691e141cdc004a1ed361459a245f8ad11fe1f10b82e0cd32cf40ab3b38a5532fd44bbcbd485a783f52dace1da947ef59e16eceb6cf5b63634bce8e764'
};
exports.default = env;
