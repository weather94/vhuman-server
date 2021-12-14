import { NextFunction, Request, Response } from "express";
import { CreateHumanDto } from "@dtos/humans.dto";
import { Human } from "@interfaces/humans.interface";
import HumanService from "@/services/humans.service";

class HumansController {
  public humanService = new HumanService();
  public getHumans = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.queryPolluted.ids) {
        const findAllHumansData: Human[] =
          await this.humanService.findHumansByIds(req.queryPolluted.ids);
        res
          .status(200)
          .json({ data: findAllHumansData, message: "findAllHumansData" });
      } else {
        const findAllHumansData: Human[] = await this.humanService.findAllHuman(
          req.query
        );
        res.status(200).json({ data: findAllHumansData, message: "findAll" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default HumansController;
