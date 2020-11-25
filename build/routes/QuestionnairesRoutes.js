"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionnairesRouter = void 0;
const express_1 = __importDefault(require("express"));
const QuestionnairesController_1 = __importDefault(require("../controller/QuestionnairesController"));
exports.questionnairesRouter = express_1.default.Router();
exports.questionnairesRouter.post("/", QuestionnairesController_1.default.createPost);
//# sourceMappingURL=QuestionnairesRoutes.js.map