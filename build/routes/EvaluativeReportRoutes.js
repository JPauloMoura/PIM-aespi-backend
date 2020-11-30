"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluativeReportRouter = void 0;
const express_1 = __importDefault(require("express"));
const EvaluativeReportController_1 = __importDefault(require("../controller/EvaluativeReportController"));
exports.evaluativeReportRouter = express_1.default.Router();
exports.evaluativeReportRouter.post("/", EvaluativeReportController_1.default.addResponseQuestion);
exports.evaluativeReportRouter.get("/list/:role", EvaluativeReportController_1.default.getReport);
exports.evaluativeReportRouter.get("/list/:role/question", EvaluativeReportController_1.default.getReportByQuestionId);
//# sourceMappingURL=EvaluativeReportRoutes.js.map