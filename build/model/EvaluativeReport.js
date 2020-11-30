"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeResponse = exports.EvaluativeReport = void 0;
class EvaluativeReport {
    constructor(idQuestion, response) {
        this.idQuestion = idQuestion;
        this.response = response;
        this.getIdQuestion = () => this.idQuestion;
        this.getResponse = () => this.response;
        switch (response.toLowerCase()) {
            case TypeResponse.GREAT:
                this.response = TypeResponse.GREAT;
                break;
            case TypeResponse.GOOD:
                this.response = TypeResponse.GOOD;
                break;
            case TypeResponse.BAD:
                this.response = TypeResponse.BAD;
                break;
            case TypeResponse.VERY_BAD:
                this.response = TypeResponse.VERY_BAD;
                break;
            default:
                throw new Error("Invalid typeResponse: choose 'great', 'good', 'bad' or 'very bad'");
        }
    }
}
exports.EvaluativeReport = EvaluativeReport;
var TypeResponse;
(function (TypeResponse) {
    TypeResponse["GREAT"] = "great";
    TypeResponse["GOOD"] = "good";
    TypeResponse["BAD"] = "bad";
    TypeResponse["VERY_BAD"] = "very bad";
})(TypeResponse = exports.TypeResponse || (exports.TypeResponse = {}));
//# sourceMappingURL=EvaluativeReport.js.map