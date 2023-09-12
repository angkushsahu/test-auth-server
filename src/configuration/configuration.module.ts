import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

const Configuration = ConfigModule.forRoot({
   envFilePath: [".env", "config.env"],
   isGlobal: true,
   cache: true,
   expandVariables: true,
});

@Module({
   imports: [Configuration],
})
export class ConfigurationModule {}
