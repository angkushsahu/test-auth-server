import { Body, Controller, Post, Res } from "@nestjs/common";
import { LoginDTO, SignupDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post("signup")
   async signup(@Body() user: SignupDTO, @Res() res: Response) {
      const { token, ...returnValue } = await this.authService.signup(user);
      const cookieOptions = this.authService.cookieOptions();
      res.cookie(process.env["TOKEN_NAME"], token, cookieOptions).status(201).json(returnValue);
   }

   @Post("login")
   async login(@Body() user: LoginDTO, @Res() res: Response) {
      const { token, ...returnValue } = await this.authService.login(user);
      const cookieOptions = this.authService.cookieOptions();
      res.cookie(process.env["TOKEN_NAME"], token, cookieOptions).status(200).json(returnValue);
   }
}
