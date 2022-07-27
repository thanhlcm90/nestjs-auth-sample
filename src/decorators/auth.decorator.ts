import {applyDecorators, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtAuthGuard} from "guards/jwt.auth.guard";

export function Auth(): (
  target: unknown,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<unknown>
) => void {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({description: "Unauthorized"})
  );
}
