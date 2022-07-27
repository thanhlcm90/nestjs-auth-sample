import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {ConfigService} from "modules/shared/services/config.service";
import {SharedModule} from "modules/shared/shared.module";
import {UserModule} from "modules/user/user.module";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {expiresIn: configService.jwtExpiresIn},
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
