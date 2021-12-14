import { NextFunction, Request, Response } from "express";
import { CreateTokenDto } from "@dtos/tokens.dto";
import { Token } from "@interfaces/tokens.interface";
import TokenService from "@/services/tokens.service";

class TokensController {
  public tokenService = new TokenService();

  public getTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllTokensData: Token[] = await this.tokenService.findAllToken();

      res.status(200).json({ data: findAllTokensData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getTokenById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenId: string = req.params.id;
      const findOneTokenData: Token = await this.tokenService.findTokenById(
        tokenId
      );

      res.status(200).json({ data: findOneTokenData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenData: CreateTokenDto = req.body;
      const createTokenData: Token = await this.tokenService.createToken(
        tokenData
      );

      res.status(201).json({ data: createTokenData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenId: string = req.params.id;
      const tokenData: CreateTokenDto = req.body;
      const updateTokenData: Token = await this.tokenService.updateToken(
        tokenId,
        tokenData
      );

      res.status(200).json({ data: updateTokenData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenId: string = req.params.id;
      const deleteTokenData: Token = await this.tokenService.deleteToken(
        tokenId
      );

      res.status(200).json({ data: deleteTokenData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default TokensController;
