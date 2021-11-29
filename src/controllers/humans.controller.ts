import { NextFunction, Request, Response } from "express";
import { CreateHumanDto } from "@dtos/humans.dto";
import { Human } from "@interfaces/humans.interface";
import humanService from "@/services/humans.service";

class HumansController {
  public humanService = new humanService();

  public getHumans = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllHumansData: Human[] = await this.humanService.findAllHuman();

      res.status(200).json({ data: findAllHumansData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getHumanById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const humanId: string = req.params.id;
      const findOneHumanData: Human = await this.humanService.findHumanById(
        humanId
      );

      res.status(200).json({ data: findOneHumanData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createHuman = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const humanData: CreateHumanDto = req.body;
      const createHumanData: Human = await this.humanService.createHuman(
        humanData
      );

      res.status(201).json({ data: createHumanData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateHuman = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const humanId: string = req.params.id;
      const humanData: CreateHumanDto = req.body;
      const updateHumanData: Human = await this.humanService.updateHuman(
        humanId,
        humanData
      );

      res.status(200).json({ data: updateHumanData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteHuman = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const humanId: string = req.params.id;
      const deleteHumanData: Human = await this.humanService.deleteHuman(
        humanId
      );

      res.status(200).json({ data: deleteHumanData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default HumansController;
