import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  NestApplicationOptions,
  ValidationPipe,
} from "@nestjs/common";
import {NestFactory, Reflector} from "@nestjs/core";
import {ExpressAdapter, NestExpressApplication} from "@nestjs/platform-express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

import {setupSwagger} from "./setup-swagger";
import {HttpExceptionFilter} from "../filters/exception.filter";

export class MyNestApplication {
  public app?: NestExpressApplication;

  public logger = new Logger(MyNestApplication.name);

  /**
   * constructor
   *
   * @param appModule Entry (root) application module class
   */
  constructor(private appModule: unknown) {}

  /**
   * setup the Nest Application, must call first after initilize the class
   *
   * @param {NestApplicationOptions} option
   */
  async setup(
    option: NestApplicationOptions = {cors: true}
  ): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(
      this.appModule,
      new ExpressAdapter(),
      option
    );

    if (option.cors) {
      app.enableCors();
    }
    app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

    app.use(helmet());
    app.use(compression());
    app.use(morgan("combined"));

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        transformOptions: {enableImplicitConversion: true},
        // dismissDefaultMessages: true,
        forbidUnknownValues: true,
        // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      })
    );

    this.app = app;

    return app;
  }

  /**
   * attach swagger
   *
   * @param {string} swaggerPath
   * @param {string} apiVersion
   */
  async useSwagger(swaggerPath: string, apiVersion: string): Promise<void> {
    setupSwagger(this.app, swaggerPath, apiVersion);
  }

  /**
   * run and listen the app
   *
   * @param port
   */
  async listen(port: number): Promise<void> {
    await this.app?.listen(port);

    this.logger.log(`SERVER RUNNING ON PORT ${port}`);
  }
}
