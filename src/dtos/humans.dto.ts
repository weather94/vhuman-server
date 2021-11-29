import { IsString, IsNumber } from "class-validator";

export class CreateHumanDto {
  @IsNumber()
  public id: number;
  @IsString()
  public name: string;
  @IsString()
  public description: string;
  @IsString()
  public external_url: string;
  @IsString()
  public image: string;
}
