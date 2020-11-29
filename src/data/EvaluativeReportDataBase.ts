import { EvaluativeReport } from "../model/EvaluativeReport";
import { TypeUser } from "../model/Users";
import {BaseDataBase} from "./BaseDataBase";

class EvaluativeReportDataBase extends BaseDataBase{
    private tableName: string = "evaluative_report"
    
    public async addResponse (resp: EvaluativeReport) {
        
        try {
            await this.getConnection()
            .insert({
                id_question: resp.getIdQuestion(),
                response: resp.getResponse(),
            }).into(this.tableName)
               
        } catch (error) {
            throw new Error(error);   
        }
    }

    public async getReport (role: TypeUser ) {
        
        try {
          const ttResp =  await this.getConnection().raw(`
            SELECT q.id AS "id", q.question AS "question",
            q.role AS "role", e.response AS "response"  
            FROM evaluative_report AS e
            JOIN questionnaires AS q
            ON e.id_question = q.id
            WHERE q.role = '${role}';
          `)

            return ttResp.rows
            
        } catch (error) {
            throw new Error(error);   
        } 
    }
}

export const evaluativeReportDataBase: EvaluativeReportDataBase = new EvaluativeReportDataBase()
