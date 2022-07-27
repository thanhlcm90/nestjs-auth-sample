import {Test} from "@nestjs/testing";
import request from "supertest";
import {AppModule} from "../src/app.module";
import {INestApplication} from "@nestjs/common";
import {DbTestModule} from "modules/db/db.test.module";

describe("E2E Testing", () => {
  let app: INestApplication;
  let baseRequest: request.SuperTest<request.Test>;
  let accessToken: string;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule, DbTestModule],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
    baseRequest = request(app.getHttpServer());
  });

  test("application should defined", () => expect(app).toBeDefined());

  describe("Unauthorize 401", () => {
    test("GET /api/v1/user/profile 401", () =>
      baseRequest.get(`/api/v1/user/profile`).expect(401));
    test("PUT /api/v1/user/profile 401", () =>
      baseRequest.put(`/api/v1/user/profile`).expect(401));
    test("PUT /api/v1/user/password 401", () =>
      baseRequest.put(`/api/v1/user/password`).expect(401));
  });

  describe("Register user", () => {
    test("POST /api/v1/auth/register 200", () =>
      baseRequest
        .post(`/api/v1/auth/register`)
        .send({username: "admin", password: "admin"})
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("access_token");
        }));

    test("POST /api/v1/auth/register 500 - duplicate username", () =>
      baseRequest
        .post(`/api/v1/auth/register`)
        .send({username: "admin", password: "admin"})
        .expect(500));
  });

  describe("Login user", () => {
    test("POST /api/v1/auth/login 200", () =>
      baseRequest
        .post(`/api/v1/auth/login`)
        .send({username: "admin", password: "admin"})
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("access_token");
        }));

    test("POST /api/v1/auth/login 401", () =>
      baseRequest
        .post(`/api/v1/auth/login`)
        .send({username: "admin", password: "wrong"})
        .expect(401));
  });

  describe("Login user", () => {
    test("POST /api/v1/auth/login 200", () =>
      baseRequest
        .post(`/api/v1/auth/login`)
        .send({username: "admin", password: "admin"})
        .expect(200)
        .expect((res) => {
          accessToken = res.body.access_token;
          expect(res.body).toHaveProperty("access_token");
        }));

    test("POST /api/v1/auth/login 401", () =>
      baseRequest
        .post(`/api/v1/auth/login`)
        .send({username: "admin", password: "wrong"})
        .expect(401));
  });

  describe("Get user profile", () => {
    test("GET /api/v1/user/profile 200", () =>
      baseRequest
        .get(`/api/v1/user/profile`)
        .set("authorization", `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({username: "admin"});
        }));
  });

  describe("Change user profile", () => {
    test("PUT /api/v1/user/profile 200", () =>
      baseRequest
        .put(`/api/v1/user/profile`)
        .set("authorization", `Bearer ${accessToken}`)
        .send({firstName: "super", lastName: "admin"})
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            username: "admin",
            firstName: "super",
            lastName: "admin",
          });
        }));
  });

  describe("Change user password", () => {
    test("PUT /api/v1/user/password 401 : wrong old password", () =>
      baseRequest
        .put(`/api/v1/user/password`)
        .set("authorization", `Bearer ${accessToken}`)
        .send({oldPassword: "123", newPassword: "new"})
        .expect(401));

    test("PUT /api/v1/user/password 200", () =>
      baseRequest
        .put(`/api/v1/user/password`)
        .set("authorization", `Bearer ${accessToken}`)
        .send({oldPassword: "admin", newPassword: "new"})
        .expect(200));
  });

  describe("Login user after change password", () => {
    test("POST /api/v1/auth/login 200", () =>
      baseRequest
        .post(`/api/v1/auth/login`)
        .send({username: "admin", password: "new"})
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("access_token");
        }));

    test("POST /api/v1/auth/login 401", () =>
      baseRequest
        .post(`/api/v1/auth/login`)
        .send({username: "admin", password: "admin"})
        .expect(401));
  });

  afterAll(async () => {
    await app.close();
  });
});
