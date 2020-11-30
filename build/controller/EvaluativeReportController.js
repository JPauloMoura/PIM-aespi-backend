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
const EvaluativeReportBusiness_1 = __importDefault(require("../business/EvaluativeReportBusiness"));
const BaseDataBase_1 = require("../data/BaseDataBase");
class EvaluativeReportController {
    addResponseQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const respQuestion = {
                    idQuestion: req.body.idQuestion,
                    typeResponse: req.body.typeResponse,
                    token: req.headers.authorization,
                };
                yield EvaluativeReportBusiness_1.default.addResponseQuestion(respQuestion);
                res.status(201).send({ message });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
            yield BaseDataBase_1.BaseDataBase.destroyConnection();
        });
    }
    getReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const report = {
                    role: req.params.role,
                    token: req.headers.authorization,
                };
                const listReport = yield EvaluativeReportBusiness_1.default.getReport(report);
                res.status(200).send({ message, listReport });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
            yield BaseDataBase_1.BaseDataBase.destroyConnection();
        });
    }
    getReportByQuestionId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const report = {
                    role: req.params.role,
                    idQuestion: req.query.id,
                    token: req.headers.authorization,
                };
                const listReport = yield EvaluativeReportBusiness_1.default.getReportByQuestionId(report);
                res.status(200).send({ message, listReport });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
            yield BaseDataBase_1.BaseDataBase.destroyConnection();
        });
    }
}
exports.default = new EvaluativeReportController();
//# sourceMappingURL=EvaluativeReportController.js.map