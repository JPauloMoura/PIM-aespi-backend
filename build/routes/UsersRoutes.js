"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = __importDefault(require("../controller/UsersController"));
exports.usersRouter = express_1.default.Router();
exports.usersRouter.post("/signup", UsersController_1.default.signup);
exports.usersRouter.post("/login", UsersController_1.default.login);
exports.usersRouter.post("/change-done-status", UsersController_1.default.changeDoneStatus);
//# sourceMappingURL=UsersRoutes.js.map