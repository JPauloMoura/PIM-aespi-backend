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
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluativeReportDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class EvaluativeReportDataBase extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.tableName = "evaluative_report";
    }
    addResponse(resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id_question: resp.getIdQuestion(),
                    response: resp.getResponse(),
                }).into(this.tableName);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getReport(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ttResp = yield this.getConnection().raw(`
            SELECT q.id AS "id", q.question AS "question",
            q.role AS "role", e.response AS "response"  
            FROM evaluative_report AS e
            JOIN questionnaires AS q
            ON e.id_question = q.id
            WHERE q.role = '${role}';
          `);
                return ttResp.rows;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getReportByQuestionId(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ttResp = yield this.getConnection().raw(`
            SELECT q.id AS "id", q.question AS "question",
            q.role AS "role", e.response AS "response"  
            FROM evaluative_report AS e
            JOIN questionnaires AS q
            ON e.id_question = q.id
            WHERE q.role = '${query.role}' 
            AND q.id = '${query.idQuestion}' ;
          `);
                return ttResp.rows;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.evaluativeReportDataBase = new EvaluativeReportDataBase();
//# sourceMappingURL=EvaluativeReportDataBase.js.map