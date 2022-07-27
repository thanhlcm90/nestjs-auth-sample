import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export type AuthUser = {
  id: number;
  username: string;
};

export const GetAuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): AuthUser | null | undefined => {
    const request = ctx.switchToHttp().getRequest();

    return data ? request.user[data] : request.user;
  }
);
