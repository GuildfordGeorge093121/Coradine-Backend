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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const loggers_1 = require("../middlewares/loggers");
const pool = new pg_1.Pool({
    user: "postgres",
    database: "coradineuser",
    password: "dad0208282611",
    host: "localhost",
    port: 5432
});
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(commandResult)
    const requestTime = new Date();
    const commandResult = yield pool.query(text, params);
    const afterRequest = new Date();
    const str = `${text}---ON---${requestTime}---DURATION---${afterRequest.getMilliseconds() - requestTime.getMilliseconds()} ms\n`;
    (0, loggers_1.databaseLog)(str);
    return commandResult;
});
exports.default = query;
