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
const QuestionnairesBusiness_1 = __importDefault(require("../business/QuestionnairesBusiness"));
class QuestionnairesController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const question = {
                    text: req.body.text,
                    role: req.body.role,
                    token: req.headers.authorization,
                };
                yield QuestionnairesBusiness_1.default.createQuestion(question);
                res.status(201).send({ message });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
        });
    }
}
exports.default = new QuestionnairesController();
//# sourceMappingURL=QuestionnairesController.js.map