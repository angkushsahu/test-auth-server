import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ErrorHandler } from "src/exceptions";
import { IDecodedToken } from "src/types";
import { Request } from "express";
import { AuthService } from "src/apiModules/auth/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
   constructor(private readonly userService: AuthService) {
      super({
         jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
         ignoreExpiration: false,
         secretOrKey: process.env["SECRET"],
      });
   }

   private static extractJWT(req: Request) {
      if (req.cookies && process.env["TOKEN_NAME"] in req.cookies) return req.cookies[process.env["TOKEN_NAME"]];
      return null;
   }

   async validate(payload: IDecodedToken) {
      const user = await this.userService.getUserByIdForPassportValidation(payload.id);
      if (!user) throw new ErrorHandler("Please login to access this resource", 401);
      return user;
   }
}
