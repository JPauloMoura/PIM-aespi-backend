import express from "express"
import QuestionnairesController from "../controller/QuestionnairesController";

export const questionnairesRouter = express.Router();

questionnairesRouter.post("/", QuestionnairesController.createQuestion)
questionnairesRouter.get("/list", QuestionnairesController.getQuestionsByRole)