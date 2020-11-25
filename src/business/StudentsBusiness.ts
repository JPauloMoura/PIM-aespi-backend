import { studentsDataBase } from "../data/StudentsDataBase";
import { inputStudent, Student } from "../model/Student";
import Authenticator from "../services/Authenticator";
import EmailValidator from "../services/EmailValidator";
import { hashManage } from "../services/HashManage";
import IdGenerator from "../services/IdGenerator";

class StudentsBusiness {
    public async signup (signup:inputStudent): Promise<string> {
        try {
    
            if (!signup.email || !signup.password) {
                throw new Error('"email" and "password" must be provided')
            }
            if(!EmailValidator.check(signup.email)){
                throw new Error('Invalid email')
            }
       
            const cypherPassword: string = await hashManage.hash(signup.password);
    
            const student: Student = new Student(
                IdGenerator.generateId(),
                signup.email,
                cypherPassword,
                false
            )
    
            await studentsDataBase.createStudent(student)
       
            const token: string = Authenticator.generateToken({id: student.getId()})
            if(!token) throw new Error("Invalid token");
    
            return token
    
        } catch (error) {
            throw new Error(error)
        }
    }

    public async login (login:inputStudent): Promise<string> {
        try {

            if (!login.email || !login.password) {
                throw new Error('"email" and "password" must be provided')
            }
            if(!EmailValidator.check(login.email)){
                throw new Error('Invalid email')
            }
       
            const result = await studentsDataBase.getStudentByEmail(login.email)
       
            if (!result) throw new Error("Invalid credentials")
       
            const student: Student = new Student (
              result.id,
              result.email,
              result.password,
              result.questionnaireAnswered
            )
       
            const passwordIsCorrect: boolean = await hashManage.compare(login.password, student.getPassword())
       
            if (!passwordIsCorrect) throw new Error("Invalid credentials")
       
            return Authenticator.generateToken({id: student.getId()})
    
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new StudentsBusiness()