import express from "express"
import StudentsController from "../controller/StudentsController";

export const studentsRouter = express.Router();

studentsRouter.post("/signup", StudentsController.signup)