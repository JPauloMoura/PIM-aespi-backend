"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const StudentsController_1 = __importDefault(require("../controller/StudentsController"));
exports.studentsRouter = express_1.default.Router();
exports.studentsRouter.post("/signup", StudentsController_1.default.signup);
//# sourceMappingURL=StudentsRoutes.js.map