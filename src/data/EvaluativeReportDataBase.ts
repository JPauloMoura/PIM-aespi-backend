import { EvaluativeReport } from "../model/EvaluativeReport";
import BaseDataBase from "./BaseDataBase";

class EvaluativeReportDataBase extends BaseDataBase{
    private tableName: string = "evaluative_report"
    
    public async addResponse (resp: EvaluativeReport) {
        
        try {
            await BaseDataBase.connection
            .insert({
                id_question: resp.getIdQuestion(),
                response: resp.getResponse(),
            }).into(this.tableName)
               
        } catch (error) {
            throw new Error(error);   
        }
    }
}

export const evaluativeReportDataBase: EvaluativeReportDataBase = new EvaluativeReportDataBase()