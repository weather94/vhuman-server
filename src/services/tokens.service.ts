import bcrypt from "bcrypt";
import { CreateTokenDto } from "@dtos/tokens.dto";
import { HttpException } from "@exceptions/HttpException";
import { Token } from "@interfaces/tokens.interface";
import tokenModel from "@models/tokens.model";
import { isEmpty } from "@utils/util";

class TokenService {
  public tokens = tokenModel;

  public async findAllToken(): Promise<Token[]> {
    const users: Token[] = await this.tokens.find();
    return users;
  }

  public async findTokenById(tokenId: string): Promise<Token> {
    if (isEmpty(tokenId)) throw new HttpException(400, "You're not tokenId");

    const findToken: Token = await this.tokens.findOne({ _id: tokenId });
    if (!findToken) throw new HttpException(409, "You're not token");

    return findToken;
  }

  public async createToken(tokenData: CreateTokenDto): Promise<Token> {
    if (isEmpty(tokenData))
      throw new HttpException(400, "You're not tokenData");

    const createTokenData: Token = await this.tokens.create({
      _id: tokenData.id,
      ...tokenData,
    });

    return createTokenData;
  }

  public async updateToken(
    tokenId: string,
    tokenData: CreateTokenDto
  ): Promise<Token> {
    if (isEmpty(tokenData))
      throw new HttpException(400, "You're not tokenData");

    const updateTokenById: Token = await this.tokens.findByIdAndUpdate(
      tokenId,
      {
        ...tokenData,
      }
    );
    if (!updateTokenById) throw new HttpException(409, "You're not token");

    return updateTokenById;
  }

  public async deleteToken(tokenId: string): Promise<Token> {
    const deleteTokenById: Token = await this.tokens.findByIdAndDelete(tokenId);
    if (!deleteTokenById) throw new HttpException(409, "You're not token");

    return deleteTokenById;
  }
}

export default TokenService;
