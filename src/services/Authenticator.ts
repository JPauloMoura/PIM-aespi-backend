import * as jwt from "jsonwebtoken"
import { TypeUser } from "../model/Users"

class Authenticator {
   public generateToken ( payload: AuthenticationData): string {
        return jwt.sign(
           payload,
           process.env.JWT_KEY as string,
           {
              expiresIn: process.env.JWT_EXPIRES_IN
           }
        )
    }

   public getTokenData(token: string): AuthenticationData {
        const result: any = jwt.verify(
           token,
           process.env.JWT_KEY as string
        )
     
        return { 
           id: result.id,
           role: result.role
         }
     }
}

export interface AuthenticationData {
   id: string
   role: TypeUser
}

export default new Authenticator()