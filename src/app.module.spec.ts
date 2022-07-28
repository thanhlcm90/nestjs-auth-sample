import {Test, TestingModule} from "@nestjs/testing";
import {DbTestModule} from "db/db.test.module";
import {AppModule} from "./app.module";

describe("AppModule", () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, DbTestModule],
    }).compile();
  });

  test("module should be defined", () => {
    expect(module).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});
