import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AppExceptionFilter } from "./exceptions";
import { SchemaModule } from "./schema/schema.module";
import { AuthModule } from "./apiModules/auth/auth.module";
import { UserModule } from "./apiModules/user/user.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigurationModule } from "./configuration/configuration.module";

@Module({
   imports: [ConfigurationModule, DatabaseModule, SchemaModule, AuthModule, UserModule],
   providers: [{ provide: APP_FILTER, useClass: AppExceptionFilter }],
})
export class AppModule {}
