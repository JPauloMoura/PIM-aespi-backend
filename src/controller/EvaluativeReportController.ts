import { Request, Response } from "express"
import { inputGetReport, inputGetReportFilter, inputResponseQuestion } from "../model/EvaluativeReport"
import { TypeResponse } from "../model/EvaluativeReport"
import EvaluativeReportBusiness from "../business/EvaluativeReportBusiness"
import { TypeUser } from "../model/Users"
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

    public async getReport (req: Request, res: Response):Promise<void> {
        try {
            let message = "Success!"
    
            const report: inputGetReport = {
                role: req.params.role as TypeUser,
                token: req.headers.authorization as string,
            }
    
            const listReport = await EvaluativeReportBusiness.getReport(report)
        
            res.status(200).send({ message, listReport })
        
        } catch (error) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400
            res.send({ message })
        }

        await BaseDataBase.destroyConnection()

    }
    
    public async getReportByQuestionId (req: Request, res: Response):Promise<void> {
        try {
            let message = "Success!"
    
            const report: inputGetReportFilter = {
                role: req.params.role as TypeUser,
                idQuestion: req.query.id as string,
                token: req.headers.authorization as string,
            }
    
            const listReport = await EvaluativeReportBusiness.getReportByQuestionId(report)
        
            res.status(200).send({ message, listReport })
        
        } catch (error) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400
            res.send({ message })
        }
        await BaseDataBase.destroyConnection()
    }
}

export default new EvaluativeReportController()