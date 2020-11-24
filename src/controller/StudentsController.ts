import { Request, Response } from "express"
import StudentsBusiness from "../business/StudentsBusiness"
import { inputStudent } from "../model/Student"

class StudentsController {
    public async signup (req: Request, res: Response): Promise<void> {
        try {
    
            let message = "Success!"
    
            const signup: inputStudent = {
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

    public  async login (req: Request, res: Response):Promise<void> {
        try {
           let message = "Success!"
     
           const login: inputStudent = {
              email: req.body.email,
              password: req.body.password
           }
     
           const token: string = await StudentsBusiness.login(login)
     
           res.status(200).send({ message, token })
     
           } catch (error) {
              let message = error.sqlMessage || error.message
              res.statusCode = 400
     
              res.send({ message })
           }
    }

}

export default new StudentsController()