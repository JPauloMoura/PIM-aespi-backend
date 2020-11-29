import { TypeUser } from "./Users";

export class EvaluativeReport {
    constructor(
       private idQuestion: string,
       private response: TypeResponse,
    ){
        switch (response.toLowerCase()) {
            case TypeResponse.GREAT:
                this.response = TypeResponse.GREAT
                break;
            case TypeResponse.GOOD:
                this.response = TypeResponse.GOOD
                break
            case TypeResponse.BAD:
                this.response = TypeResponse.BAD
                break
            case TypeResponse.VERY_BAD:
                this.response = TypeResponse.VERY_BAD
                break
            default:
                throw new Error("Invalid typeResponse: choose 'great', 'good', 'bad' or 'very bad'");
        }
     }

    public getIdQuestion = () => this.idQuestion
    public getResponse = () => this.response
}

export enum TypeResponse {
  GREAT = "great",
  GOOD = "good",
  BAD = "bad",
  VERY_BAD = "very bad"
}

export interface inputResponseQuestion {
    idQuestion: string,
    typeResponse: TypeResponse,
    token: string
}

export interface inputGetReport {
    role: TypeUser,
    token: string
}
export interface inputGetReportFilter {
    role: TypeUser,
    idQuestion: string
    token: string
}

export interface outPutReport {
    id: string,
    question:string,
    role: TypeUser,
    response: TypeResponse
}

export interface outPutReportFormatted {
    totalResponses: number,
    qttResponses: {
        GREAT: number,
        GOOD: number,
        BAD: number,
        VERY_BAD: number
    },
    "percentage(%)": {
        GREAT: number,
        GOOD: number,
        BAD: number,
        VERY_BAD: number
    } 
}
