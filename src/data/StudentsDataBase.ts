import { Student } from "../model/Student";
import BaseDataBase from "./BaseDataBase";

class StudentsDataBase extends BaseDataBase{
    private tableName: string = "students"
    
    public async createStudent (student: Student) {
        try {
            await BaseDataBase.connection
            .insert({
                id: student.getId(),
                email: student.getEmail(),
                password: student.getPassword(),
                questionnaire_answered: student.getQuestionnaireAnswered()
            }).into(this.tableName)
            
        } catch (error) {
            throw new Error(error);   
        }
    }

    public async getStudentByEmail (email: string):Promise<any> {
        try {
            const [student] = await BaseDataBase.connection
                        .select("*")
                        .from(this.tableName)
                        .where({ email })
            return student
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const studentsDataBase: StudentsDataBase = new StudentsDataBase()