"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UsersRoutes_1 = require("./routes/UsersRoutes");
const QuestionnairesRoutes_1 = require("./routes/QuestionnairesRoutes");
const EvaluativeReportRoutes_1 = require("./routes/EvaluativeReportRoutes");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/users", UsersRoutes_1.usersRouter);
app.use("/questionnaires", QuestionnairesRoutes_1.questionnairesRouter);
app.use("/evaluative-report", EvaluativeReportRoutes_1.evaluativeReportRouter);
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
//# sourceMappingURL=index.js.map