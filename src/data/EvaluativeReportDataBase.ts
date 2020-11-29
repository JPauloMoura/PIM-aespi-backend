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
        } catch (error) {
            throw new Error(error);   
        }
    }
}

export const evaluativeReportDataBase: EvaluativeReportDataBase = new EvaluativeReportDataBase()