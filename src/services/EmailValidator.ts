import * as validator from 'email-validator';
 
class EmailValidator {
   public check = (email: string): boolean => {
      return validator.validate(email)
   }
}

export default new EmailValidator() 