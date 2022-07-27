import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {Auth} from "decorators/auth.decorator";
import {AuthUser, GetAuthUser} from "decorators/auth.user.decorator";
import {ChangeUserPasswordParamDto} from "./dto/change.user.password.param.dto";
import {ProfileUpdateParamDto} from "./dto/profile.update.param.dto";
import {User} from "./entities/user.entity";
import {UserService} from "./user.service";

@Controller("api/v1/user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get("/profile")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get user profile",
    operationId: "getUser",
  })
  @ApiOkResponse({
    description: "Success",
    type: User,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  async getUser(@GetAuthUser() user: AuthUser): Promise<User> {
    const data = await this.userService.findOneById(user.id);

    if (!data) throw new UnauthorizedException();

    return data;
  }

  @Auth()
  @Put("/profile")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update user profile",
    operationId: "updateUser",
  })
  @ApiOkResponse({
    description: "Success",
    type: User,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  async updateUser(
    @GetAuthUser() user: AuthUser,
    @Body() body: ProfileUpdateParamDto
  ): Promise<User> {
    const data = await this.userService.findOneById(user.id);

    if (!data) throw new UnauthorizedException();

    const updatedUser = await this.userService.update({...data, ...body});

    return updatedUser;
  }

  @Auth()
  @Put("/password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Change user password",
    operationId: "changePassword",
  })
  @ApiOkResponse({
    description: "Success",
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
  })
  async changePassword(
    @GetAuthUser() user: AuthUser,
    @Body() body: ChangeUserPasswordParamDto
  ): Promise<void> {
    const data = await this.userService.findOneByUserName(user.username);

    if (!data) throw new UnauthorizedException();

    const validPassword = await data.comparePassword(body.oldPassword);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    await data.savePassword(body.newPassword);
    await this.userService.update(data);
  }
}
