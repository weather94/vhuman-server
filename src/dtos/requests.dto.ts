import { IsString, IsNumber, IsBoolean } from "class-validator";

export class CreateRequestDto {
  @IsString()
  public requestId: string;
  @IsString()
  public client: string;
  @IsString()
  public converter: string;
  @IsString()
  public sourceUri: string;
  @IsString()
  public target: string;
  @IsString()
  public resultUri: string;
  @IsString()
  public status: string;
  @IsString()
  public time: string;
  @IsBoolean()
  public allowed: boolean;
}
