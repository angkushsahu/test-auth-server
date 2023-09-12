import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { compare, genSalt, hash } from "bcrypt";
import { Document, Model } from "mongoose";

@Schema({ timestamps: true, collection: "users" })
export class User {
   @Prop({ required: [true, "Please enter your name"] })
   name: string;

   @Prop({ required: [true, "Please enter an e-mail"], unique: [true, "E-mail already exists"] })
   email: string;

   @Prop({ required: [true, "Please enter a password"] })
   password: string;

   @Prop({ default: "" })
   resetPassword: string;

   comparePassword: (enteredPassword: string) => Promise<boolean>;
}

export const UsersSchema = SchemaFactory.createForClass(User);

UsersSchema.pre("save", async function (next: Function) {
   if (!this.isModified("password")) next();
   const salt = await genSalt(10);
   this.password = await hash(this.password, salt);
   next();
});

const transformOptions = {
   transform: function (document, returnUser, options) {
      delete returnUser.password;
      delete returnUser.resetPassword;
      return returnUser;
   },
};
UsersSchema.set("toObject", transformOptions);
UsersSchema.set("toJSON", transformOptions);

UsersSchema.methods.comparePassword = async function (enteredPassword: string) {
   return await compare(enteredPassword, this.password);
};

export const USER_MODEL = User.name;
export type UserDocument = User & Document;
export type UserModelType = Model<UserDocument>;
