import {Test, TestingModule} from "@nestjs/testing";
import {DbTestModule} from "modules/db/db.test.module";
import {UserModule} from "./user.module";

describe("UserModule", () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DbTestModule, UserModule],
    }).compile();
  });

  test("module should be defined", () => {
    expect(module).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});
