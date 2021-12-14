import { IsString, IsNumber } from "class-validator";

export class CreateRequestDto {
  @IsString()
  public client: string;
  @IsString()
  public converter: string;
  @IsString()
  public sourceUri: string;
  @IsNumber()
  public target: number;
  @IsString()
  public resultUri: string;
  @IsString()
  public humanNumber: string;
  @IsString()
  public status: string;
  @IsString()
  public time: string;
}
