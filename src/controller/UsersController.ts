import { Request, Response } from "express"
import UsersBusiness from "../business/UsersBusiness"
import { BaseDataBase } from "../data/BaseDataBase"
import { inputUsers, TypeUser } from "../model/Users"


class UsersController {
    public async signup (req: Request, res: Response): Promise<void> {
        try {
    
            let message = "Success!"
    
            const signup: inputUsers = {
                email: req.body.email, 
                password: req.body.password, 
                role: req.body.role
            }
     
            const token:string = await UsersBusiness.signup(signup)
           
            res.status(201).send({ message, token })
      
         } catch (error) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            if(message.includes("duplicate")){
                message = "User already registered"
            }

            if(message.includes("must be provided")){
                message = "invalid request body: {email, password, role}"
            }
            res.send({ message })
         }
         await BaseDataBase.destroyConnection()
    }

    public  async login (req: Request, res: Response):Promise<void> {
        try {
           let message = "Success!"
     
           const login: inputUsers = {
              email: req.body.email as string,
              password: req.body.password as string,
              role: req.body.role as TypeUser
           }
     
           const token: string = await UsersBusiness.login(login)
     
           res.status(200).send({ message, token })
     
           } catch (error) {
              let message = error.sqlMessage || error.message
              res.statusCode = 400
              
              if(message.includes("must be provided")){
                message = "invalid request body: {email, password, role}"
              }

     
              res.send({ message })
           }
           await BaseDataBase.destroyConnection()
    }

}

export default new UsersController()