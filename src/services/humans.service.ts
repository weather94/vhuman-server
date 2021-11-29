import bcrypt from "bcrypt";
import { CreateHumanDto } from "@dtos/humans.dto";
import { HttpException } from "@exceptions/HttpException";
import { Human } from "@interfaces/humans.interface";
import humanModel from "@models/humans.model";
import { isEmpty } from "@utils/util";

class HumanService {
  public humans = humanModel;

  public async findAllHuman(): Promise<Human[]> {
    const users: Human[] = await this.humans.find();
    return users;
  }

  public async findHumanById(humanId: string): Promise<Human> {
    if (isEmpty(humanId)) throw new HttpException(400, "You're not humanId");

    const findHuman: Human = await this.humans.findOne({ _id: humanId });
    if (!findHuman) throw new HttpException(409, "You're not human");

    return findHuman;
  }

  public async createHuman(humanData: CreateHumanDto): Promise<Human> {
    if (isEmpty(humanData))
      throw new HttpException(400, "You're not humanData");

    const createHumanData: Human = await this.humans.create({
      _id: humanData.id,
      ...humanData,
    });

    return createHumanData;
  }

  public async updateHuman(
    humanId: string,
    humanData: CreateHumanDto
  ): Promise<Human> {
    if (isEmpty(humanData))
      throw new HttpException(400, "You're not humanData");

    const updateHumanById: Human = await this.humans.findByIdAndUpdate(
      humanId,
      {
        ...humanData,
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
