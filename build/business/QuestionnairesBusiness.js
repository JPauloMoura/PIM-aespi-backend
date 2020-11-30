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
const QuestionnairesDataBase_1 = require("../data/QuestionnairesDataBase");
const CustomErrors_1 = require("../errors/CustomErrors");
const Questionnaires_1 = require("../model/Questionnaires");
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const IdGenerator_1 = __importDefault(require("../services/IdGenerator"));
class QuestionnairesBusiness {
    createQuestion(question) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!question.text || !question.role) {
                    throw new CustomErrors_1.CustomError(400, '"text" and "role" must be provided');
                }
                if (!question.token)
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                const user = Authenticator_1.default.getTokenData(question.token);
                if (!(user.id))
                    throw new CustomErrors_1.CustomError(400, "Invalid Token");
                if (!(user.role === "admin"))
                    throw new CustomErrors_1.CustomError(403, "You do not have ADMIN permission");
                const newQuestion = new Questionnaires_1.Questionnaires(IdGenerator_1.default.generateId(), question.text, question.role);
                yield QuestionnairesDataBase_1.questionnairesDataBase.createQuestion(newQuestion);
            }
            catch (error) {
                let message = error.message || error.sqlMessage;
                if (message.includes("jwt expired")) {
                    throw new CustomErrors_1.CustomError(400, "Token expired");
                }
                if (message.includes("jwt malformed") || message.includes("invalid signature")) {
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                }
                if (message.includes("must be provided")) {
                    throw new CustomErrors_1.CustomError(203, "invalid request body: {text, role}");
                }
                if (message.includes("violates unique")) {
                    throw new CustomErrors_1.CustomError(406, "question already registered");
                }
                throw new CustomErrors_1.CustomError(400, message);
            }
        });
    }
    getQuestionByRole(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                const infoUser = Authenticator_1.default.getTokenData(token);
                if (!infoUser.role) {
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                }
                if (infoUser.role === "admin") {
                    const questions = yield QuestionnairesDataBase_1.questionnairesDataBase.getAllQuestions();
                    return questions;
                }
                const questions = yield QuestionnairesDataBase_1.questionnairesDataBase.getQuestionByRole(infoUser.role);
                return questions;
            }
            catch (error) {
                let message = error.message || error.sqlMessage;
                if (message.includes("jwt expired")) {
                    throw new CustomErrors_1.CustomError(400, "Token expired");
                }
                if (message.includes("jwt malformed") || message.includes("invalid signature")) {
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                }
                if (message.includes("must be provided")) {
                    throw new CustomErrors_1.CustomError(400, "invalid request body: {text, role}");
                }
                throw new CustomErrors_1.CustomError(400, message);
            }
        });
    }
}
exports.default = new QuestionnairesBusiness();
//# sourceMappingURL=QuestionnairesBusiness.js.map