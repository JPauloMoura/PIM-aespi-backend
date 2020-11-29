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

    public async getUserById (id: string):Promise<Users> {
        try {
            const [result] = await this.getConnection()
                        .select("*")
                        .from(this.tableName)
                        .where({ id })

            const user: Users = new Users(
                result.id,
                result.email,
                result.password,
                result.role,
                result.questionnaire_answered
            )
            return user
        } catch (error) {
            throw new Error(error);
        }
    }

    public async changeDoneStatus (id: string):Promise<void> {
        try {
            await this.getConnection().raw(`
                UPDATE ${this.tableName}
                SET questionnaire_answered = not questionnaire_answered
                WHERE id = '${id}';
            `)
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const usersDataBase: UsersDataBase = new UsersDataBase()