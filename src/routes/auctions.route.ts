import { Router } from "express";
import AuctionsController from "@controllers/auctions.controller";
import { CreateAuctionDto } from "@dtos/auctions.dto";
import { Routes } from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class AuctionsRoute implements Routes {
  public path = "/auctions";
  public router = Router();
  public auctionsController = new AuctionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.auctionsController.getAuctions);
  }
}

export default AuctionsRoute;
