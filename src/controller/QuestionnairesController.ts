import { Request, Response } from "express"
import QuestionnairesBusiness from "../business/QuestionnairesBusiness"
import { inputQuestion } from "../model/Questionnaires"
import { TypeUser } from "../model/Users"

class QuestionnairesController {
    async createPost (req: Request, res: Response):Promise<void> {
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
}

export default new QuestionnairesController()