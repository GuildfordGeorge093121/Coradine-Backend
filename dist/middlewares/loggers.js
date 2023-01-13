"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseLog = exports.requestLog = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const requestLog = (req, res, next) => {
    const log = `${req.method}---${req.path}---${req.ip}---${Date()}\n`;
    promises_1.default.appendFile(path_1.default.join(__dirname, "../../", 'logs', 'clientRequest.txt'), log);
    next();
};
exports.requestLog = requestLog;
const databaseLog = (res) => {
    promises_1.default.writeFile(path_1.default.join(__dirname, "../../", 'logs', 'database.txt'), res);
};
exports.databaseLog = databaseLog;
