export class Questionnaire {
    constructor(
       private id: string,
       private question: string,
       private role: TypeUser,
    ){
        switch (role.toLowerCase()) {
            case TypeUser.STUDENT:
                this.role = TypeUser.STUDENT
                break;
            case TypeUser.TEACHER:
                this.role = TypeUser.TEACHER
                break
            case TypeUser.ADMIN:
                this.role = TypeUser.ADMIN
                break
            default:
                throw new Error("Invalid role: choose 'student', 'teacher' or 'admin'");
        }
     }

    public getId = () => this.id
    public getQuestion = () => this.question
    public getRole = () => this.role
}

export interface inputQuestion {
    text:string,
    role: TypeUser
}

export enum TypeUser {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin"
}