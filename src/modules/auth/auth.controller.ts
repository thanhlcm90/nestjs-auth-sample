import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {LoginParamDto} from "./dto/login.param.dto";
import {LoginPayloadDto} from "./dto/login.payload.dto";
import {RegisterParamDto} from "./dto/register.param.dto";

@Controller("api/v1/auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "login with user credentials",
    operationId: "login",
  })
  @ApiOkResponse({
    description: "Success",
    type: LoginPayloadDto,
  })
  @ApiUnauthorizedResponse({
    description: "Wrong credential",
  })
  async login(@Body() param: LoginParamDto): Promise<LoginPayloadDto> {
    const user = await this.authService.validateUser(param);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.genJwt(user);
  }

  @Post("/register")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Register new user",
    operationId: "register",
  })
  @ApiOkResponse({
    description: "Success",
    type: LoginPayloadDto,
  })
  async register(@Body() param: RegisterParamDto): Promise<LoginPayloadDto> {
    const user = await this.authService.register(param);

    return this.authService.genJwt(user);
  }
}
