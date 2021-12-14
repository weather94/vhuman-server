import { IsBoolean, IsString, IsArray } from "class-validator";
import { Request } from "@/interfaces/requests.interface";
export class CreateHumanDto {
  @IsString()
  public tokenId: string;
  @IsString()
  public owner: string;
  @IsString()
  public name: string;
  @IsString()
  public description: string;
  @IsString()
  public external_url: string;
  @IsString()
  public image: string;
  @IsArray()
  public requests: Request[];
  @IsBoolean()
  public staked: boolean;
  public manual: boolean;
  public fee: string;
  public balance: string;
}
