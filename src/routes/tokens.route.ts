import { Router } from "express";
import TokensController from "@controllers/tokens.controller";
import { CreateTokenDto } from "@dtos/tokens.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class TokensRoute implements Routes {
  public path = "/tokens";
  public router = Router();
  public tokensController = new TokensController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tokensController.getTokens);
    this.router.get(`${this.path}/:id`, this.tokensController.getTokenById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateTokenDto, "body"),
      this.tokensController.createToken
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateTokenDto, "body", true),
      this.tokensController.updateToken
    );
    this.router.delete(`${this.path}/:id`, this.tokensController.deleteToken);
  }
}

export default TokensRoute;
