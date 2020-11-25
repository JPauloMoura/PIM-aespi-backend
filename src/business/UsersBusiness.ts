import { usersDataBase } from "../data/UsersDataBase";
import { CustomError } from "../errors/CustomErrors";
import { inputUsers, TypeUser, Users } from "../model/Users";
import Authenticator from "../services/Authenticator";
import EmailValidator from "../services/EmailValidator";
import { hashManage } from "../services/HashManage";
import IdGenerator from "../services/IdGenerator";

class UsersBusiness {
    public async signup (signup:inputUsers): Promise<string> {
        try {
          
            if (!signup.email || !signup.password || !signup.role) {
                throw new CustomError(400,'"email", "role" and "password" must be provided')
            }
            if(!EmailValidator.check(signup.email)){
                throw new CustomError(400,'Invalid email')
            }
    
            const cypherPassword: string = await hashManage.hash(signup.password);
    
            const user: Users = new Users(
                IdGenerator.generateId(),
                signup.email,
                cypherPassword,
                signup.role,
                false
            )

            await usersDataBase.createUser(user)
       
            const token: string = Authenticator.generateToken({id: user.getId(), role: user.getRole()})
            if(!token) throw new CustomError(400, "Invalid token");
    
            return token
    
        } catch (error) {
            throw new Error(error)
        }
    }

    public async login (login: inputUsers): Promise<string> {
        try {

            if (!login.email || !login.password) {
                throw new CustomError(400,'"email", "password" must be provided')
            }
            if(!EmailValidator.check(login.email)){
                throw new CustomError(400,'Invalid email')
            }

            if(!(login.role.toUpperCase() in TypeUser)){
                throw new CustomError(400,"Invalid role: choose 'student', 'teacher' or 'admin'");
            }
       
            const result = await usersDataBase.getUserByEmail(login.email)
       
            if (!result) throw new CustomError(400,"Invalid credentials")
       
            const user: Users = new Users(
              result.id,
              result.email,
              result.password,
              result.role,
              result.questionnaireAnswered
            )
       
            const passwordIsCorrect: boolean = await hashManage.compare(login.password, user.getPassword())
       
            if (!passwordIsCorrect) throw new CustomError(400,"Invalid credentials")
       
            return Authenticator.generateToken({id: user.getId(), role: user.getRole()})
    
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new UsersBusiness()