import { NextFunction, Request, Response } from "express";
import { CreateAuctionDto } from "@dtos/auctions.dto";
import { Auction } from "@interfaces/auctions.interface";
import AuctionService from "@/services/auctions.service";

class AuctionsController {
  public auctionService = new AuctionService();
  public getAuctions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllAuctionsData: Auction[] =
        await this.auctionService.findAllAuction();
      res.status(200).json({ data: findAllAuctionsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuctionsController;
