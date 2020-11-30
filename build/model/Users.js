"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUser = exports.Users = void 0;
class Users {
    constructor(id, email, password, role, questionnaireAnswered) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.questionnaireAnswered = questionnaireAnswered;
        this.getId = () => this.id;
        this.getEmail = () => this.email;
        this.getPassword = () => this.password;
        this.getRole = () => this.role;
        this.getQuestionnaireAnswered = () => this.questionnaireAnswered;
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
exports.Users = Users;
var TypeUser;
(function (TypeUser) {
    TypeUser["STUDENT"] = "student";
    TypeUser["TEACHER"] = "teacher";
    TypeUser["ADMIN"] = "admin";
})(TypeUser = exports.TypeUser || (exports.TypeUser = {}));
//# sourceMappingURL=Users.js.map