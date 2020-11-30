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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDataBase = void 0;
const Users_1 = require("../model/Users");
const BaseDataBase_1 = require("./BaseDataBase");
class UsersDataBase extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.tableName = "users";
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: user.getId(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    role: user.getRole(),
                    questionnaire_answered: user.getQuestionnaireAnswered()
                }).into(this.tableName);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [user] = yield this.getConnection()
                    .select("*")
                    .from(this.tableName)
                    .where({ email });
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield this.getConnection()
                    .select("*")
                    .from(this.tableName)
                    .where({ id });
                const user = new Users_1.Users(result.id, result.email, result.password, result.role, result.questionnaire_answered);
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    changeDoneStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection().raw(`
                UPDATE ${this.tableName}
                SET questionnaire_answered = not questionnaire_answered
                WHERE id = '${id}';
            `);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.usersDataBase = new UsersDataBase();
//# sourceMappingURL=UsersDataBase.js.map