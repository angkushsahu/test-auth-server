import { Controller, Delete, Get, Request, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CustomRequest } from "src/types";
import { Response } from "express";

@Controller("user")
export class UserController {
   @UseGuards(AuthGuard("jwt"))
   @Get("logout")
   logout(@Res() res: Response) {
      res.clearCookie(process.env["TOKEN_NAME"]).status(200).json({ success: true, message: "Logout successful" });
   }

   @UseGuards(AuthGuard("jwt"))
   @Get()
   getUser(@Request() req: CustomRequest) {
      return { success: true, message: "User found successfully", user: req.user };
   }

   @UseGuards(AuthGuard("jwt"))
   @Delete()
   async deleteAccount(@Request() req: CustomRequest, @Res() res: Response) {
      await req.user.deleteOne();
      return res.clearCookie(process.env["TOKEN_NAME"]).status(200).json({ success: true, message: "Deleted user successfully" });
   }
}
