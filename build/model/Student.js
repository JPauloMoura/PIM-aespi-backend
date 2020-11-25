"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(id, email, password, questionnaireAnswered) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.questionnaireAnswered = questionnaireAnswered;
        this.getId = () => this.id;
        this.getEmail = () => this.email;
        this.getPassword = () => this.password;
        this.getQuestionnaireAnswered = () => this.questionnaireAnswered;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map