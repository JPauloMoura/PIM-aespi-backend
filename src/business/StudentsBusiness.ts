import { studentsDataBase } from "../data/StudentsDataBase";
import { inputNewStudent, Student } from "../model/Student";
import Authenticator from "../services/Authenticator";
import { hashManage } from "../services/HashManage";
import IdGenerator from "../services/IdGenerator";

class StudentsBusiness {
    public async signup (signup:inputNewStudent): Promise<string> {
        try {
    
            if (!signup.email || !signup.password) {
                throw new Error('"email" and "password" must be provided')
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

}

export default new StudentsBusiness()