import bcrypt from "bcrypt";
import { CreateHumanDto } from "@dtos/humans.dto";
import { CreateRequestDto } from "@dtos/requests.dto";
import { Request } from "@interfaces/requests.interface";
import { HttpException } from "@exceptions/HttpException";
import { Human } from "@interfaces/humans.interface";
import humanModel from "@models/humans.model";
import { isEmpty } from "@utils/util";

class HumanService {
  public humans = humanModel;

  public async findAllHuman(filter): Promise<Human[]> {
    const humans: Human[] = await this.humans.find(filter);
    return humans;
  }
  public async findHumansByIds(humanIds: string[]): Promise<Human[]> {
    const findHumans: Human[] = await this.humans.find({
      tokenId: {
        $in: humanIds,
      },
    });
    if (!findHumans) throw new HttpException(409, "You're not humans");
    return findHumans;
  }
  public async findHumanById(humanId: string): Promise<Human> {
    if (isEmpty(humanId)) throw new HttpException(400, "You're not humanId");
    const findHuman: Human = await this.humans.findOne({ _id: humanId });
    if (!findHuman) throw new HttpException(409, "You're not human");
    return findHuman;
  }
  public async findHumanByTokenId(tokenId: string): Promise<Human> {
    if (isEmpty(tokenId)) throw new HttpException(400, "You're not humanId");
    const findHuman: Human = await this.humans.findOne({ tokenId });
    if (!findHuman) throw new HttpException(409, "You're not human");
    return findHuman;
  }
  public async findAllHumanOrderByProfit(): Promise<Human[]> {
    const humans: Human[] = await this.humans.find();
    return humans;
  }
  public async createHuman(humanData: CreateHumanDto): Promise<Human> {
    console.log("createHuman2");
    if (isEmpty(humanData))
      throw new HttpException(400, "You're not tokenData");
    console.log("createHuman3");
    const createHumanData: Human = await this.humans.create({
      ...humanData,
    });
    console.log("createHuman4");
    return createHumanData;
  }

  public async createRequest(
    tokenId: string,
    requestData: CreateRequestDto
  ): Promise<Request> {
    if (isEmpty(requestData))
      throw new HttpException(400, "You're not bidData");
    const findHuman: Human = await this.findHumanByTokenId(tokenId);
    if (findHuman.requests) {
      findHuman.requests.push(requestData);
    } else {
      findHuman.requests = [requestData];
    }
    await this.humans.findByIdAndUpdate(findHuman._id, findHuman);
    return findHuman.requests[findHuman.requests.length - 1];
  }

  public async updateHumanByTokenId(
    tokenId: string,
    humanData: CreateHumanDto
  ): Promise<Human> {
    if (isEmpty(humanData))
      throw new HttpException(400, "You're not tokenData");

    const updateHumanById: Human = await this.humans.findOneAndUpdate(
      { tokenId },
      humanData
    );

    if (!updateHumanById) throw new HttpException(409, "You're not human");
    return updateHumanById;
  }

  public async updateHuman(
    humanId: string,
    humanData: CreateHumanDto
  ): Promise<Human> {
    if (isEmpty(humanData))
      throw new HttpException(400, "You're not tokenData");
    const updateHumanById: Human = await this.humans.findByIdAndUpdate(
      humanId,
      {
        ...humanData,
      }
    );
    if (!updateHumanById) throw new HttpException(409, "You're not human");
    return updateHumanById;
  }

  public async addBalance(tokenId: string, balance: string): Promise<Human> {
    if (isEmpty(balance)) throw new HttpException(400, "You're not tokenData");

    const updateHumanById: Human = await this.humans.findOneAndUpdate(
      { tokenId },
      {
        balance,
      }
    );

    if (!updateHumanById) throw new HttpException(409, "You're not human");
    return updateHumanById;
  }

  public async deleteHuman(humanId: string): Promise<Human> {
    const deleteHumanById: Human = await this.humans.findByIdAndDelete(humanId);
    if (!deleteHumanById) throw new HttpException(409, "You're not human");
    return deleteHumanById;
  }
}

export default HumanService;
