import bcrypt from "bcrypt";
import { CreateHumanDto } from "@dtos/humans.dto";
import { CreateRequestDto } from "@dtos/requests.dto";
import { Request } from "@interfaces/requests.interface";
import { HttpException } from "@exceptions/HttpException";
import { Human } from "@interfaces/humans.interface";
import humanModel from "@models/humans.model";
import { isEmpty } from "@utils/util";
import BN from "bn.js";

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
    if (isEmpty(humanData))
      throw new HttpException(400, "You're not tokenData");
    const createHumanData: Human = await this.humans.create({
      ...humanData,
    });
    return createHumanData;
  }

  public async createRequest(
    tokenId: string,
    requestData: CreateRequestDto
  ): Promise<Request> {
    if (isEmpty(requestData))
      throw new HttpException(400, "You're not bidData");
    const findHuman: Human = await this.findHumanByTokenId(tokenId);
    requestData.allowed = !findHuman.manual;
    if (findHuman.requests) {
      findHuman.requests.push(requestData);
    } else {
      findHuman.requests = [requestData];
    }
    await this.humans.findByIdAndUpdate(findHuman._id, findHuman);
    return findHuman.requests[findHuman.requests.length - 1];
  }

  public async updateRequest(
    tokenId: string,
    requestId: string,
    requestData: Object
  ): Promise<Human> {
    if (isEmpty(requestData))
      throw new HttpException(400, "You're not bidData");
    const findHuman = await this.humans.findOne({ tokenId });
    const index = findHuman.requests.findIndex(
      (item) => item.requestId === requestId
    );
    Object.keys(requestData).forEach((item) => {
      findHuman.requests[index][item] = requestData[item];
    });
    findHuman.save();
    return findHuman;
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

  public async addBalance(tokenId: string): Promise<Human> {
    if (isEmpty(tokenId)) throw new HttpException(400, "You're not tokenData");

    const human = await this.humans.findOne({ tokenId });
    human.balance = new BN(human.balance).add(new BN(human.fee)).toString();
    human.total = new BN(human.total).add(new BN(human.fee)).toString();
    human.save();
    if (!human) throw new HttpException(409, "You're not human");
    return human;
  }

  public async subBalance(tokenId: string, balance: string): Promise<Human> {
    if (isEmpty(tokenId)) throw new HttpException(400, "You're not tokenData");

    const human = await this.humans.findOne({ tokenId });
    human.balance = new BN(human.balance).sub(new BN(balance)).toString();
    human.save();
    if (!human) throw new HttpException(409, "You're not human");
    return human;
  }

  public async deleteHuman(humanId: string): Promise<Human> {
    const deleteHumanById: Human = await this.humans.findByIdAndDelete(humanId);
    if (!deleteHumanById) throw new HttpException(409, "You're not human");
    return deleteHumanById;
  }
}

export default HumanService;
