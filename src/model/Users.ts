export class Users {
    constructor(
       private id: string,
       private email: string,
       private password: string,
       private role: TypeUser,
       private questionnaireAnswered: boolean
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
    public getEmail = () => this.email
    public getPassword = () => this.password
    public getRole = () => this.role
    public getQuestionnaireAnswered = () => this.questionnaireAnswered
}

export interface inputUsers {
    email:string,
    password: string,
    role: TypeUser
}

export enum TypeUser {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin"
}