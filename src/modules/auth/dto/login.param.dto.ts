import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty} from "class-validator";

export class LoginParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
