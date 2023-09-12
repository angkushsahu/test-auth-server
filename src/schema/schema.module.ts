import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersSchema, USER_MODEL } from "./user.schema";

const MODELS = [{ name: USER_MODEL, schema: UsersSchema }];

@Global()
@Module({
   imports: [MongooseModule.forFeature(MODELS)],
   exports: [MongooseModule],
})
export class SchemaModule {}
