import {Injectable} from "@nestjs/common";
import dotenv from "dotenv";
import {DbConfig} from "../interfaces/db.config";

@Injectable()
export class ConfigService {
  constructor() {
    const {nodeEnv} = this;
    dotenv.config({
      path: `.${nodeEnv}.env`,
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, "\n");
    }
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getBoolean(key: string): boolean {
    return ["1", "true"].includes(process.env[key]);
  }

  public getNumber(key: string, defaultValue?: number): number {
    const v = Number(this.get(key));
    return Number.isNaN(v) ? defaultValue : v;
  }

  get nodeEnv(): string {
    return this.get("NODE_ENV") || "development";
  }

  get host(): string {
    return this.get("HOST") || "olapass-core";
  }

  get port(): number {
    return this.getNumber("PORT", 3000);
  }

  get swaggerPath(): string {
    return this.get("SWAGGER_PATH") || "api-docs";
  }

  get jwtSecret(): string {
    return this.get("JWT_SECRET") || "changeme";
  }

  get jwtExpiresIn(): string {
    return this.get("JWT_EXPIRES_IN") || "1d";
  }

  get dbConfig(): DbConfig {
    return {
      host: this.get("MYSQL_HOST"),
      port: this.getNumber("MYSQL_PORT"),
      database: this.get("MYSQL_DB"),
      username: this.get("MYSQL_USER"),
      password: this.get("MYSQL_PASS"),
    };
  }
}
