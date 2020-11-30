"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUser = exports.Questionnaires = void 0;
class Questionnaires {
    constructor(id, question, role) {
        this.id = id;
        this.question = question;
        this.role = role;
        this.getId = () => this.id;
        this.getQuestion = () => this.question;
        this.getRole = () => this.role;
        switch (role.toLowerCase()) {
            case TypeUser.STUDENT:
                this.role = TypeUser.STUDENT;
                break;
            case TypeUser.TEACHER:
                this.role = TypeUser.TEACHER;
                break;
            case TypeUser.ADMIN:
                this.role = TypeUser.ADMIN;
                break;
            default:
                throw new Error("Invalid role: choose 'student', 'teacher' or 'admin'");
        }
    }
}
exports.Questionnaires = Questionnaires;
var TypeUser;
(function (TypeUser) {
    TypeUser["STUDENT"] = "student";
    TypeUser["TEACHER"] = "teacher";
    TypeUser["ADMIN"] = "admin";
})(TypeUser = exports.TypeUser || (exports.TypeUser = {}));
//# sourceMappingURL=Questionnaires.js.map