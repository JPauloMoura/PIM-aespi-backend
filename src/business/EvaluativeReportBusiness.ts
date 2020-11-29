import {BaseDataBase} from "../data/BaseDataBase";
import { evaluativeReportDataBase } from "../data/EvaluativeReportDataBase";
import { CustomError } from "../errors/CustomErrors";
import { EvaluativeReport, inputResponseQuestion, TypeResponse } from "../model/EvaluativeReport";
import Authenticator, { AuthenticationData } from "../services/Authenticator";

class EvaluativeReportBusiness {
    public async addResponseQuestion (resp:inputResponseQuestion): Promise<void> {
        try {
          
            if (!resp.idQuestion || !resp.typeResponse) {
                throw new CustomError(400,'"id" and "role" must be provided')
            }
            if(!(resp.typeResponse.toUpperCase() in TypeResponse) &&
                 resp.typeResponse.toLowerCase() !== "very bad"
            ){
                throw new Error("Invalid typeResponse: choose 'great', 'good', 'bad' or 'very bad'");
            }
            
            if(!resp.token) throw new CustomError(400,"Invalid token");
    
            const user: AuthenticationData = Authenticator.getTokenData(resp.token)
    
            if(!(user.id)) throw new CustomError(400,"Invalid Token");
    
            const newResponse: EvaluativeReport = new EvaluativeReport(resp.idQuestion, resp.typeResponse)

            await evaluativeReportDataBase.addResponse(newResponse)
    
        } catch (error) {
            let message = error.message || error.sqlMessage

            if(message.includes("jwt expired")){
                throw new CustomError(400, "Token expired");
            }

            if(message.includes("jwt malformed") || message.includes("invalid signature")){
                throw new CustomError(400, "Invalid token");
            }
            if(message.includes("must be provided")){
                throw new CustomError(400, "invalid request body: {idQuestion, typeResponse}");
            }
            if(message.includes("violates unique")){
                throw new CustomError(400, "question already registered");
            }
            if(message.includes("violates foreign key constraint")){
                throw new CustomError(400, "the question ID is invalid");
            }

            throw new CustomError(400, message);
        }
    }

}

export default new EvaluativeReportBusiness()