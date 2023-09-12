import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "src/strategies";

@Module({
   imports: [PassportModule, JwtModule.register({ secret: process.env["SECRET"] })],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
