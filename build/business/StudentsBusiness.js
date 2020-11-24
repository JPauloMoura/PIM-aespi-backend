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
const StudentsDataBase_1 = require("../data/StudentsDataBase");
const Student_1 = require("../model/Student");
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const HashManage_1 = require("../services/HashManage");
const IdGenerator_1 = __importDefault(require("../services/IdGenerator"));
class StudentsBusiness {
    signup(signup) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!signup.email || !signup.password) {
                    throw new Error('"email" and "password" must be provided');
                }
                const cypherPassword = yield HashManage_1.hashManage.hash(signup.password);
                const student = new Student_1.Student(IdGenerator_1.default.generateId(), signup.email, cypherPassword, false);
                yield StudentsDataBase_1.studentsDataBase.createStudent(student);
                const token = Authenticator_1.default.generateToken({ id: student.getId() });
                if (!token)
                    throw new Error("Invalid token");
                return token;
            }
            catch (error) {
                if (error.sqlMessage.includes("Duplicate entry")) {
                    throw new Error("Registered student");
                }
                throw new Error(error);
            }
        });
    }
}
exports.default = new StudentsBusiness();
//# sourceMappingURL=StudentsBusiness.js.map