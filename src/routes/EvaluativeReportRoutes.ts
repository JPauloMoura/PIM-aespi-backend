import express from "express"
import EvaluativeReportController from "../controller/EvaluativeReportController";

export const evaluativeReportRouter = express.Router();

evaluativeReportRouter.post("/", EvaluativeReportController.addResponseQuestion)