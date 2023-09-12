import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
   createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
      const uri = process.env["MONGO_URI"];
      return { uri };
   }
}
