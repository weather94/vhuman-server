process.env["NODE_CONFIG_DIR"] = __dirname + "/configs";

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { connect, set } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { dbConnection } from "@databases";
import { Routes } from "@interfaces/routes.interface";
import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || "development";

    this.connectToDatabase(); // 데이터베이스 연결
    this.initializeMiddlewares(); // 미들웨어 설정
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== "production") {
      set("debug", true);
    }

    connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get("log.format"), { stream })); // HTTP 요청 로그를 남깁니다.
    this.app.use(
      cors({
        origin: config.get("cors.origin"),
        credentials: config.get("cors.credentials"),
      })
    ); // CORS 설정
    this.app.use(hpp()); // http parameter pollution 으로 parameter공격 방지, 똑같은 이름의 파라미터값을 배열로 변환해줌.
    this.app.use(helmet()); // 다양한 HTTP 헤더를 설정해 앱이 안전하게 도와줍니다.
    this.app.use(compression()); // response 를 gzip 로 압축하여 퍼포먼스를 높힐수 있음.
    this.app.use(express.json()); // JSON Request Body 파싱 (bodyParser의 최신버전)
    this.app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded 로 온 데이터 파싱
    this.app.use(cookieParser()); // 쿠키 헤더를 파싱하고 req.cookies에 할당합니다.
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger/users.yaml", "swagger/humans.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
