import { Questionnaires } from "../model/Questionnaires";
import { TypeUser } from "../model/Users";
import BaseDataBase from "./BaseDataBase";

class QuestionnairesDataBase extends BaseDataBase{
    private tableName: string = "questionnaires"
    
    public async createQuestion (question: Questionnaires) {
        
        try {
            await BaseDataBase.connection
            .insert({
                id: question.getId(),
                question: question.getQuestion(),
                role: question.getRole(),
            }).into(this.tableName)
               
        } catch (error) {
            throw new Error(error);   
        }
    }

    public async getQuestionByRole (role: TypeUser) {
        
        try {
           return await BaseDataBase
                .connection.select("*")
                .from(this.tableName)
                .where({ role })
               
        } catch (error) {
            throw new Error(error);   
        }
    }

    public async getAllQuestions () {
        
        try {
           return await BaseDataBase
                    .connection.select("*")
                    .from(this.tableName)
               
        } catch (error) {
            throw new Error(error);   
        }
    }

}

export const questionnairesDataBase: QuestionnairesDataBase = new QuestionnairesDataBase()