import {AppModule} from "./app.module";
import {MyNestApplication} from "application/app";
import {SharedModule} from "modules/shared/shared.module";
import {ConfigService} from "modules/shared/services/config.service";

export async function bootstrap(): Promise<MyNestApplication> {
  const olalaApp = new MyNestApplication(AppModule);

  await olalaApp.setup();

  const configService = olalaApp.app.select(SharedModule).get(ConfigService);

  await olalaApp.useSwagger(configService.swaggerPath, "1.0");
  await olalaApp.listen(configService.port);

  return olalaApp;
}

bootstrap();
