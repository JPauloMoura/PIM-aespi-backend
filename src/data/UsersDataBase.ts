import { Users } from "../model/Users";
import {BaseDataBase} from "./BaseDataBase";

class UsersDataBase extends BaseDataBase{
    private tableName: string = "users"
    
    public async createUser (user: Users) {
        
        try {
            await this.getConnection()
            .insert({
                id: user.getId(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
                questionnaire_answered: user.getQuestionnaireAnswered()
            }).into(this.tableName)
               
        } catch (error) {
            throw new Error(error);   
        }
    }

    public async getUserByEmail (email: string):Promise<any> {
        try {
            const [user] = await this.getConnection()
                        .select("*")
                        .from(this.tableName)
                        .where({ email })
            return user
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const usersDataBase: UsersDataBase = new UsersDataBase()