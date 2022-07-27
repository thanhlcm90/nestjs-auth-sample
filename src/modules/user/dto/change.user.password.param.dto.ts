import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class ChangeUserPasswordParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
