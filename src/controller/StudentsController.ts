import { Request, Response } from "express"
import StudentsBusiness from "../business/StudentsBusiness"
import { inputNewStudent } from "../model/Student"

class StudentsController {
    async signup (req: Request, res: Response): Promise<void> {
        try {
    
            let message = "Success!"
    
            const signup: inputNewStudent = {
                email: req.body.email as string,
                password: req.body.password as string
            }
            
            const token:string = await StudentsBusiness.signup(signup)
            
            res.status(201).send({ message, token })
      
         } catch (error) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message
            if(message.includes("duplicate")){
                message = "Student already registered"
            }
      
            res.send({ message })
         }
    }
}

export default new StudentsController()