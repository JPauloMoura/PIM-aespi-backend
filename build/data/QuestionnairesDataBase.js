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
exports.questionnairesDataBase = void 0;
const BaseDataBase_1 = __importDefault(require("./BaseDataBase"));
class QuestionnairesDataBase extends BaseDataBase_1.default {
    constructor() {
        super(...arguments);
        this.tableName = "questionnaires";
    }
    createQuestion(question) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDataBase_1.default.connection
                    .insert({
                    id: question.getId(),
                    question: question.getQuestion(),
                    role: question.getRole(),
                }).into(this.tableName);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.questionnairesDataBase = new QuestionnairesDataBase();
//# sourceMappingURL=QuestionnairesDataBase.js.map