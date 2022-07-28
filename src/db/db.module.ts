import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "modules/shared/services/config.service";
import {SharedModule} from "modules/shared/shared.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        ...configService.dbConfig,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
