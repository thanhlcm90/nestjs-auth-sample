import {Test, TestingModule} from "@nestjs/testing";
import {SharedModule} from "../shared.module";
import {ConfigService} from "./config.service";

describe("ConfigService", () => {
  let module: TestingModule;
  let configService: ConfigService;
  const envs = [
    "HOST",
    "PORT",
    "SWAGGER_PATH",
    "HEALTHCHECK_PATH",
    "MYSQL_HOST",
    "MYSQL_PORT",
    "MYSQL_DB",
    "MYSQL_USER",
    "MYSQL_PASS",
  ];

  beforeAll(async () => {
    envs.forEach((v) => (process.env[v] = v));

    module = await Test.createTestingModule({
      imports: [SharedModule],
    }).compile();
    configService = module.get<ConfigService>(ConfigService);
  });

  test("service should be defined", () => {
    expect(configService).toBeDefined();
  });

  test("swaggerPath", () => {
    expect(configService.swaggerPath).toEqual("SWAGGER_PATH");
  });

  afterAll(async () => {
    await module.close();
  });
});
