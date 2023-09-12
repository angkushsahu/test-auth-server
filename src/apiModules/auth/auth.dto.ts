import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class SignupDTO {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsNotEmpty()
   @IsString()
   password: string;
}

export class LoginDTO {
   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsNotEmpty()
   @IsString()
   password: string;
}
