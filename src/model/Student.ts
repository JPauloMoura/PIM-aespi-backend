export class Student {
    constructor(
       private id: string,
       private email: string,
       private password: string,
       private questionnaireAnswered: boolean
    ){ }

    public getId = () => this.id
    public getEmail = () => this.email
    public getPassword = () => this.password
    public getQuestionnaireAnswered = () => this.questionnaireAnswered
}
