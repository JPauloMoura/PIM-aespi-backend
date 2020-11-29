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
exports.studentsDataBase = void 0;
const BaseDataBase_1 = __importDefault(require("./BaseDataBase"));
class StudentsDataBase extends BaseDataBase_1.default {
    constructor() {
        super(...arguments);
        this.tableName = "students";
    }
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDataBase_1.default.connection
                    .insert({
                    id: student.getId(),
                    email: student.getEmail(),
                    password: student.getPassword(),
                    questionnaire_answered: student.getQuestionnaireAnswered()
                }).into(this.tableName);
            }
            catch (error) {
                throw new Error(error.sqlMessage);
            }
        });
    }
}
exports.studentsDataBase = new StudentsDataBase();
//# sourceMappingURL=StudentsDataBase.js.map