import { IsString } from "class-validator";

export class CreateBidDto {
  @IsString()
  public bidder: string;
  @IsString()
  public balance: string;
  @IsString()
  public time: string;
}
