import { Router } from "express";
import HumansController from "@controllers/humans.controller";
import { CreateHumanDto } from "@dtos/humans.dto";
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
    this.router.get(`${this.path}/:id`, this.humansController.getHumanById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateHumanDto, "body"),
      this.humansController.createHuman
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateHumanDto, "body", true),
      this.humansController.updateHuman
    );
    this.router.delete(`${this.path}/:id`, this.humansController.deleteHuman);
  }
}

export default HumansRoute;
