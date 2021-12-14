import { Router } from "express";
import HumansController from "@controllers/humans.controller";
import { CreateTokenDto } from "@dtos/tokens.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class HumansRoute implements Routes {
  public path = "/humans";
  public router = Router();
  public humansController = new HumansController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.humansController.getHumans);
  }
}

export default HumansRoute;
