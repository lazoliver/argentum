import express from "express";
import cors from "cors";
import vars from "./config/vars";
import logger from "./config/loggers";
import router from "./routes/router";

function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(router);

  app.listen(vars.api_port, () =>
    logger.debug(`start_server - http://localhost:${vars.api_port}`)
  );
}

startServer();
