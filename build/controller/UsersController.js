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
const UsersBusiness_1 = __importDefault(require("../business/UsersBusiness"));
class UsersController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const signup = {
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                };
                const token = yield UsersBusiness_1.default.signup(signup);
                res.status(201).send({ message, token });
            }
            catch (error) {
                res.statusCode = 400;
                let message = error.sqlMessage || error.message;
                if (message.includes("duplicate")) {
                    message = "User already registered";
                }
                if (message.includes("must be provided")) {
                    message = "invalid request body: {email, password, role}";
                }
                res.send({ message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const login = {
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                };
                const token = yield UsersBusiness_1.default.login(login);
                res.status(200).send({ message, token });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                if (message.includes("must be provided")) {
                    message = "invalid request body: {email, password, role}";
                }
                res.send({ message });
            }
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=UsersController.js.map