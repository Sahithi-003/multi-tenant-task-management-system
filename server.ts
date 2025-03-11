import express from "express";
import { Configuration, Inject } from "@tsed/di";
import { PlatformExpress } from "@tsed/platform-express";
import { UserController } from "./src/controller/user.controller";

@Configuration({
  port: 8080,
  mount: {
    "/users": [UserController],
  },
})
export class Server {}

async function bootstrap() {
  try {
    const platform = await PlatformExpress.bootstrap(Server, (app) => {
      app.use(express.json()); // ✅ Ensure JSON body is parsed
      app.use((req: { body: any }, res: any, next: () => void) => {
        console.log("Middleware executed - Body:", req.body);
        next();
      });
    });
    await platform.listen();
    console.log("Server started on http://localhost:8080");
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

bootstrap();
