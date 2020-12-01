import { outPutReport, outPutReportFormatted } from "../model/EvaluativeReport";

class CalculateReport{
    public calculate (listResponse: outPutReport[]):outPutReportFormatted {
        const great: number = listResponse.filter(resp => resp.response === "great" ).length
        const good: number = listResponse.filter(resp => resp.response === "good" ).length
        const regular: number = listResponse.filter(resp => resp.response === "regular" ).length
        const bad: number = listResponse.filter(resp => resp.response === "bad" ).length
        const veryBad: number = listResponse.filter(resp => resp.response === "very bad" ).length
        const totalResponse: number = listResponse.length


        const data: outPutReportFormatted = {
            totalResponses: totalResponse,
            qttResponses: {
                GREAT: great,
                GOOD: good,
                REGULAR: regular,
                BAD: bad,
                VERY_BAD: veryBad
            },
            "percentage(%)": {
                GREAT: great && (great/totalResponse)*100 ,
                GOOD: good && (good/totalResponse)*100 ,
                REGULAR: regular && (regular/totalResponse)*100 ,
                BAD: bad && (bad/totalResponse)*100 ,
                VERY_BAD: veryBad && (veryBad/totalResponse)*100
            } 
        }

        return data
    }
}

export default new CalculateReport()