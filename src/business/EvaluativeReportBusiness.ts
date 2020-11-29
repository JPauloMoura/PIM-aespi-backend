import { evaluativeReportDataBase } from "../data/EvaluativeReportDataBase";
import { CustomError } from "../errors/CustomErrors";
import { EvaluativeReport, inputGetReport, inputResponseQuestion, outPutReport, outPutReportFormatted, TypeResponse } from "../model/EvaluativeReport";
import { TypeUser } from "../model/Users";
import Authenticator, { AuthenticationData } from "../services/Authenticator";
import CalculateReport from "../services/CalculateReport";

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

    public async getReport (query: inputGetReport): Promise<outPutReportFormatted> {
        try {
            
            if(!(query.role.toLocaleUpperCase() in TypeUser) ||
                query.role.toLowerCase() === "admin"
             ){
                throw new Error("Invalid path: choose 'student' or 'teacher'");
            }

            if(!query.token) throw new CustomError(400,"Invalid token");
            
            const user: AuthenticationData = Authenticator.getTokenData(query.token)
            if(!(user.role === "admin")) throw new CustomError(400,"You do not have ADMIN permission");
    
            if(!(user.id)) throw new CustomError(400,"Invalid Token");

            const listResponse: outPutReport[] = await evaluativeReportDataBase.getReport(query.role)

            const report: outPutReportFormatted = CalculateReport.calculate(listResponse)
            
            return report
    
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