"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const databaseLog = (res) => {
    promises_1.default.writeFile(path_1.default.join(__dirname, "../../", 'logs', 'database.txt'), res);
};
exports.default = databaseLog;
