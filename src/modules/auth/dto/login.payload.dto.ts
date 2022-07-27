import {ApiProperty} from "@nestjs/swagger";

export class LoginPayloadDto {
  @ApiProperty()
  access_token: string;
}
