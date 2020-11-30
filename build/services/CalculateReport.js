"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CalculateReport {
    calculate(listResponse) {
        const great = listResponse.filter(resp => resp.response === "great").length;
        const good = listResponse.filter(resp => resp.response === "good").length;
        const bad = listResponse.filter(resp => resp.response === "bad").length;
        const veryBad = listResponse.filter(resp => resp.response === "very bad").length;
        const totalResponse = listResponse.length;
        const data = {
            totalResponses: totalResponse,
            qttResponses: {
                GREAT: great,
                GOOD: good,
                BAD: bad,
                VERY_BAD: veryBad
            },
            "percentage(%)": {
                GREAT: great && (great / totalResponse) * 100,
                GOOD: good && (good / totalResponse) * 100,
                BAD: bad && (bad / totalResponse) * 100,
                VERY_BAD: veryBad && (veryBad / totalResponse) * 100
            }
        };
        return data;
    }
}
exports.default = new CalculateReport();
//# sourceMappingURL=CalculateReport.js.map