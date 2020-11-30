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
const EvaluativeReportDataBase_1 = require("../data/EvaluativeReportDataBase");
const UsersDataBase_1 = require("../data/UsersDataBase");
const CustomErrors_1 = require("../errors/CustomErrors");
const EvaluativeReport_1 = require("../model/EvaluativeReport");
const Users_1 = require("../model/Users");
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const CalculateReport_1 = __importDefault(require("../services/CalculateReport"));
class EvaluativeReportBusiness {
    addResponseQuestion(resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!resp.idQuestion || !resp.typeResponse) {
                    throw new CustomErrors_1.CustomError(400, '"id" and "role" must be provided');
                }
                if (!(resp.typeResponse.toUpperCase() in EvaluativeReport_1.TypeResponse) &&
                    resp.typeResponse.toLowerCase() !== "very bad") {
                    throw new CustomErrors_1.CustomError(400, "Invalid typeResponse: choose 'great', 'good', 'bad' or 'very bad'");
                }
                if (!resp.token)
                    throw new CustomErrors_1.CustomError(401, "Invalid token");
                const user = Authenticator_1.default.getTokenData(resp.token);
                if (!(user.id))
                    throw new CustomErrors_1.CustomError(401, "Invalid Token");
                const userBd = yield UsersDataBase_1.usersDataBase.getUserById(user.id);
                if (userBd.getQuestionnaireAnswered())
                    throw new CustomErrors_1.CustomError(406, "User already answered the questionnaire");
                const newResponse = new EvaluativeReport_1.EvaluativeReport(resp.idQuestion, resp.typeResponse);
                yield EvaluativeReportDataBase_1.evaluativeReportDataBase.addResponse(newResponse);
            }
            catch (error) {
                let message = error.message || error.sqlMessage;
                if (message.includes("jwt expired")) {
                    throw new CustomErrors_1.CustomError(400, "Token expired");
                }
                if (message.includes("jwt malformed") || message.includes("invalid signature")) {
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                }
                if (message.includes("must be provided")) {
                    throw new CustomErrors_1.CustomError(400, "invalid request body: {idQuestion, typeResponse}");
                }
                if (message.includes("violates unique")) {
                    throw new CustomErrors_1.CustomError(203, "question already registered");
                }
                if (message.includes("violates foreign key constraint")) {
                    throw new CustomErrors_1.CustomError(406, "the question ID is invalid");
                }
                throw new CustomErrors_1.CustomError(400, message);
            }
        });
    }
    getReport(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(query.role.toLocaleUpperCase() in Users_1.TypeUser) ||
                    query.role.toLowerCase() === "admin") {
                    throw new Error("Invalid path: choose 'student' or 'teacher'");
                }
                if (!query.token)
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                const user = Authenticator_1.default.getTokenData(query.token);
                if (!(user.role === "admin"))
                    throw new CustomErrors_1.CustomError(403, "You do not have ADMIN permission");
                if (!(user.id))
                    throw new CustomErrors_1.CustomError(400, "Invalid Token");
                const listResponse = yield EvaluativeReportDataBase_1.evaluativeReportDataBase.getReport(query.role);
                const report = CalculateReport_1.default.calculate(listResponse);
                return report;
            }
            catch (error) {
                let message = error.message || error.sqlMessage;
                if (message.includes("jwt expired")) {
                    throw new CustomErrors_1.CustomError(400, "Token expired");
                }
                if (message.includes("jwt malformed") || message.includes("invalid signature")) {
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                }
                if (message.includes("must be provided")) {
                    throw new CustomErrors_1.CustomError(400, "invalid request body: {idQuestion, typeResponse}");
                }
                if (message.includes("violates unique")) {
                    throw new CustomErrors_1.CustomError(203, "question already registered");
                }
                if (message.includes("violates foreign key constraint")) {
                    throw new CustomErrors_1.CustomError(406, "the question ID is invalid");
                }
                throw new CustomErrors_1.CustomError(400, message);
            }
        });
    }
    getReportByQuestionId(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(query.role.toLocaleUpperCase() in Users_1.TypeUser) ||
                    query.role.toLowerCase() === "admin") {
                    throw new Error("Invalid path: choose 'student' or 'teacher'");
                }
                if (!query.token)
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                const user = Authenticator_1.default.getTokenData(query.token);
                if (!(user.role === "admin"))
                    throw new CustomErrors_1.CustomError(403, "You do not have ADMIN permission");
                if (!(user.id))
                    throw new CustomErrors_1.CustomError(400, "Invalid Token");
                const listResponse = yield EvaluativeReportDataBase_1.evaluativeReportDataBase.getReportByQuestionId(query);
                const reportFilter = CalculateReport_1.default.calculate(listResponse);
                return reportFilter;
            }
            catch (error) {
                let message = error.message || error.sqlMessage;
                if (message.includes("jwt expired")) {
                    throw new CustomErrors_1.CustomError(400, "Token expired");
                }
                if (message.includes("jwt malformed") || message.includes("invalid signature")) {
                    throw new CustomErrors_1.CustomError(400, "Invalid token");
                }
                if (message.includes("must be provided")) {
                    throw new CustomErrors_1.CustomError(400, "invalid request body: {idQuestion, typeResponse}");
                }
                if (message.includes("violates unique")) {
                    throw new CustomErrors_1.CustomError(203, "question already registered");
                }
                if (message.includes("violates foreign key constraint")) {
                    throw new CustomErrors_1.CustomError(406, "the question ID is invalid");
                }
                throw new CustomErrors_1.CustomError(400, message);
            }
        });
    }
}
exports.default = new EvaluativeReportBusiness();
//# sourceMappingURL=EvaluativeReportBusiness.js.map