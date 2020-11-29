import { Request, Response } from "express"
import { inputResponseQuestion } from "../model/EvaluativeReport"
import { TypeResponse } from "../model/EvaluativeReport"
import EvaluativeReportBusiness from "../business/EvaluativeReportBusiness"
import { BaseDataBase } from "../data/BaseDataBase"

class EvaluativeReportController {
    public async addResponseQuestion (req: Request, res: Response):Promise<void> {
        try {
            let message = "Success!"
    
            const respQuestion: inputResponseQuestion = {
                idQuestion: req.body.idQuestion as string,
                typeResponse: req.body.typeResponse as TypeResponse,
                token: req.headers.authorization as string,
            }
    
            await EvaluativeReportBusiness.addResponseQuestion(respQuestion)
        
            res.status(201).send({ message })
        
        } catch (error) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400
            res.send({ message })
        } 

        await BaseDataBase.destroyConnection()

    }
    }
}

export default new EvaluativeReportController()