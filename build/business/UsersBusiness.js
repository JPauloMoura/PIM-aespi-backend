"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersDataBase_1 = require("../data/UsersDataBase");
const CustomErrors_1 = require("../errors/CustomErrors");
const Users_1 = require("../model/Users");
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const EmailValidator_1 = __importDefault(require("../services/EmailValidator"));
const HashManage_1 = require("../services/HashManage");
const IdGenerator_1 = __importDefault(require("../services/IdGenerator"));
class UsersBusiness {
    signup(signup) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!signup.email || !signup.password || !signup.role) {
                    throw new CustomErrors_1.CustomError(400, '"email", "role" and "password" must be provided');
                }
                if (!EmailValidator_1.default.check(signup.email)) {
                    throw new CustomErrors_1.CustomError(400, 'Invalid email');
                }
                const cypherPassword = yield HashManage_1.hashManage.hash(signup.password);
                const user = new Users_1.Users(IdGenerator_1.default.generateId(), signup.email, cypherPassword, signup.role, false);
                yield UsersDataBase_1.usersDataBase.createUser(user);
                const token = Authenticator_1.default.generateToken({ id: user.getId(), role: user.getRole() });
                if (!token)
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                return token;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    login(login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!login.email || !login.password) {
                    throw new CustomErrors_1.CustomError(400, '"email", "password" must be provided');
                }
                if (!EmailValidator_1.default.check(login.email)) {
                    throw new CustomErrors_1.CustomError(400, 'Invalid email');
                }
                if (!(login.role.toUpperCase() in Users_1.TypeUser)) {
                    throw new CustomErrors_1.CustomError(400, "Invalid role: choose 'student', 'teacher' or 'admin'");
                }
                const result = yield UsersDataBase_1.usersDataBase.getUserByEmail(login.email);
                if (!result)
                    throw new CustomErrors_1.CustomError(400, "Invalid credentials");
                const user = new Users_1.Users(result.id, result.email, result.password, result.role, result.questionnaireAnswered);
                const passwordIsCorrect = yield HashManage_1.hashManage.compare(login.password, user.getPassword());
                if (!passwordIsCorrect)
                    throw new CustomErrors_1.CustomError(400, "Invalid credentials");
                return Authenticator_1.default.generateToken({ id: user.getId(), role: user.getRole() });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new UsersBusiness();
//# sourceMappingURL=UsersBusiness.js.map