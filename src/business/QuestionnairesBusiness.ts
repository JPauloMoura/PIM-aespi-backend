import { questionnairesDataBase } from "../data/QuestionnairesDataBase";
import { CustomError } from "../errors/CustomErrors";
import { inputQuestion, Questionnaires } from "../model/Questionnaires";
import Authenticator, { AuthenticationData } from "../services/Authenticator";
import IdGenerator from "../services/IdGenerator";

class QuestionnairesBusiness {
    public async createQuestion (question:inputQuestion): Promise<void> {
        try {
          
            if (!question.text || !question.role) {
                throw new CustomError(400,'"text" and "role" must be provided')
            }
            
            if(!question.token) throw new CustomError(400,"Invalid token");
    
            const user: AuthenticationData = Authenticator.getTokenData(question.token)
    
            if(!(user.id)) throw new CustomError(400,"Invalid Token");
            if(!(user.role === "admin")) throw new CustomError(400,"You do not have ADMIN permission");
    
            const newQuestion: Questionnaires = new Questionnaires(
                IdGenerator.generateId(),
                question.text,
                question.role
            )

            await questionnairesDataBase.createQuestion(newQuestion)
    
        } catch (error) {
            let message = error.message || error.sqlMessage

            if(message.includes("jwt expired")){
                throw new CustomError(400, "Token expired");
            }
            if(message.includes("jwt malformed") || message.includes("invalid signature")){
                throw new CustomError(400, "Invalid token");
            }
            if(message.includes("must be provided")){
                throw new CustomError(400, "invalid request body: {text, role}");
            }

            throw new CustomError(400, message);
        }
    }

}

export default new QuestionnairesBusiness()