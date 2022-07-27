import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "modules/user/entities/user.entity";
import {UserService} from "modules/user/user.service";
import {LoginParamDto} from "./dto/login.param.dto";
import {RegisterParamDto} from "./dto/register.param.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(param: LoginParamDto): Promise<User | null> {
    const user = await this.usersService.findOneByUserName(param.username);

    if (!user) return null;

    const valid = await user.comparePassword(param.password);

    return valid ? user : null;
  }

  async register(param: RegisterParamDto): Promise<User> {
    const user = new User();

    user.username = param.username;
    user.firstName = param.firstName;
    user.lastName = param.lastName;
    user.email = param.email;
    user.phone = param.phone;
    user.isActive = true;
    await user.savePassword(param.password);

    return this.usersService.create(user);
  }

  async genJwt(user: User): Promise<{access_token: string}> {
    const payload = {sub: user.id, username: user.username};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
