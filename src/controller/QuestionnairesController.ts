import { Request, Response } from "express"
import QuestionnairesBusiness from "../business/QuestionnairesBusiness"
import { inputQuestion, Questionnaires } from "../model/Questionnaires"
import { TypeUser } from "../model/Users"

class QuestionnairesController {
    public async createQuestion (req: Request, res: Response):Promise<void> {
        try {
            let message = "Success!"
    
            const question: inputQuestion = {
                text: req.body.text as string,
                role: req.body.role as TypeUser,
                token: req.headers.authorization as string,
            }
    
            await QuestionnairesBusiness.createQuestion(question)
        
            res.status(201).send({ message })
        
        } catch (error) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400
            res.send({ message })
        }

    }

    public async getQuestionsByRole (req: Request, res: Response):Promise<void> {
        try {
            const token:string = req.headers.authorization as string
    
            const listQuestions: Questionnaires[] = await QuestionnairesBusiness.getQuestionByRole(token)
        
            res.status(201).send({ listQuestions })
        
        } catch (error) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400
            res.send({ message })
        }

    }
}

export default new QuestionnairesController()