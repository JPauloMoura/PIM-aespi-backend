import express from "express"
import EvaluativeReportController from "../controller/EvaluativeReportController";

export const evaluativeReportRouter = express.Router();

evaluativeReportRouter.post("/", EvaluativeReportController.addResponseQuestion)
evaluativeReportRouter.get("/list/:role", EvaluativeReportController.getReport)
evaluativeReportRouter.get("/list/:role/question", EvaluativeReportController.getReportByQuestionId)