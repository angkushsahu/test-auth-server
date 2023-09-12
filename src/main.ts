import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.enableCors({ origin: [process.env["BROWSER_URL_1"], process.env["BROWSER_URL_2"]], credentials: true });
   app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
   app.setGlobalPrefix("api");
   app.use(cookieParser());
   await app.listen(process.env["PORT"]);
}
bootstrap();
