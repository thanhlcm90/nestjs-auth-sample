import {Module} from "@nestjs/common";
import {AuthModule} from "modules/auth/auth.module";
import {UserModule} from "modules/user/user.module";
import {DbModule} from "db/db.module";
import {SharedModule} from "modules/shared/shared.module";

@Module({
  imports: [SharedModule, DbModule, UserModule, AuthModule],
})
export class AppModule {}
