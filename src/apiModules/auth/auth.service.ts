import { CookieOptions } from "express";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LoginDTO, SignupDTO } from "./auth.dto";
import { ErrorHandler } from "src/exceptions";
import { USER_MODEL, UserModelType } from "src/schema/user.schema";

@Injectable()
export class AuthService {
   constructor(@InjectModel(USER_MODEL) private readonly userModel: UserModelType, private readonly jwtService: JwtService) {}

   cookieOptions() {
      const cookieOptions: CookieOptions = {
         expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
         secure: process.env.NODE_ENV === "production",
         httpOnly: true,
         sameSite: false,
         domain: process.env["BROWSER_URL_1"],
      };
      console.log(cookieOptions);

      return cookieOptions;
   }

   async signup(user: SignupDTO) {
      try {
         const isExistingUser = await this.userModel.findOne({ email: user.email });
         if (isExistingUser) throw new ErrorHandler("Your e-mail is already registered, login instead", 409);

         const newUser = new this.userModel(user);
         await newUser.save();

         const token = this.jwtService.sign({ id: newUser.id }, { secret: process.env["SECRET"] });
         return { success: true, message: "Register successful", user: newUser, token };
      } catch (error) {
         throw new ErrorHandler(error.message, error.statusCode);
      }
   }

   async login(user: LoginDTO) {
      try {
         const foundUser = await this.userModel.findOne({ email: user.email }).select("+password");
         if (!foundUser) throw new ErrorHandler("Account not registered, signup instead", 404);

         const arePasswordsSame = await foundUser.comparePassword(user.password);
         if (!arePasswordsSame) throw new ErrorHandler("Invalid credentials", 400);

         const token = this.jwtService.sign({ id: foundUser.id }, { secret: process.env["SECRET"] });
         return { success: true, message: "Login successful", user: foundUser, token };
      } catch (error) {
         throw new ErrorHandler(error.message, error.statusCode);
      }
   }

   // for passport auth guard
   async getUserByIdForPassportValidation(id: string) {
      try {
         const user = await this.userModel.findById(id);
         if (!user) throw new ErrorHandler("User not found", 404);
         return user;
      } catch (error) {
         throw new ErrorHandler(error.message, error.statusCode);
      }
   }
}
