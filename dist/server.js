"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authController_1 = __importDefault(require("./controllers/authController"));
const registerController_1 = __importDefault(require("./controllers/registerController"));
const userVerification_1 = __importDefault(require("./middlewares/userVerification"));
const refreshAccessToken_1 = __importDefault(require("./middlewares/refreshAccessToken"));
const logout_1 = __importDefault(require("./controllers/logout"));
const dotenv_1 = __importDefault(require("dotenv"));
const getUser_1 = __importDefault(require("./controllers/getUser"));
const loggers_1 = require("./middlewares/loggers");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
// Default middleware
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(loggers_1.requestLog);
app.post("/login", authController_1.default);
app.post("/register", registerController_1.default);
app.put('/logout', logout_1.default);
app.get("/verify", userVerification_1.default, refreshAccessToken_1.default);
app.get('/user/:accessToken', getUser_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
