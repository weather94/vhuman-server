import { IsString, IsArray } from "class-validator";
import { Bid } from "@interfaces/bids.interface";

export class CreateAuctionDto {
  @IsString()
  public tokenId: string;
  @IsString()
  public deadline: string;
  @IsString()
  public executed: boolean;
  @IsArray()
  public bids: [Bid];
}
