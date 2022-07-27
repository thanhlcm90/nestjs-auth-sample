import {ApiProperty, OmitType} from "@nestjs/swagger";
import {IsString, IsNotEmpty} from "class-validator";
import {User} from "modules/user/entities/user.entity";

export class RegisterParamDto extends OmitType(User, [
  "id",
  "hashedPassword",
  "isActive",
]) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
