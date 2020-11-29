
/**************************** IMPORTS ******************************/

import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { AddressInfo } from "net"
import { usersRouter } from "./routes/UsersRoutes"
import { questionnairesRouter } from "./routes/QuestionnairesRoutes"
import { evaluativeReportRouter } from "./routes/EvaluativeReportRoutes"


/**************************** CONFIG ******************************/
dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(cors())

/**************************** ENDPOINTS ******************************/

app.use("/users", usersRouter);
app.use("/questionnaires", questionnairesRouter);
app.use("/evaluative-report", evaluativeReportRouter);

/**************************** SERVER INIT ******************************/

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
});