import {Test, TestingModule} from "@nestjs/testing";
import {DbTestModule} from "modules/db/db.test.module";
import {User} from "./entities/user.entity";
import {UserModule} from "./user.module";
import {UserService} from "./user.service";
import {pick} from "lodash";

describe("UserService", () => {
  let module: TestingModule;
  let userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DbTestModule, UserModule],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test("service should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("create", () => {
    test("should return user", async () => {
      const user = new User();

      user.username = "admin";
      user.firstName = "super";
      user.lastName = "admin";
      user.email = "admin@gmail.com";
      user.phone = "+84858000000";
      await user.savePassword("changeme");

      const createdUser = await userService.create(user);

      expect(createdUser).toMatchObject(
        pick(user, ["username", "firstName", "lastName", "email", "phone"])
      );
    });
  });

  afterAll(async () => {
    await module.close();
  });
});
