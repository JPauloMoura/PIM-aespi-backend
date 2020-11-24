
/**************************** IMPORTS ******************************/

import express, { Express } from "express"
import cors from "cors"
import { AddressInfo } from "net"
import { studentsRouter } from "./routes/StudentsRoutes"

/**************************** CONFIG ******************************/

const app: Express = express()
app.use(express.json())
app.use(cors())

/**************************** ENDPOINTS ******************************/

app.use("/students", studentsRouter);

/**************************** SERVER INIT ******************************/

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
});