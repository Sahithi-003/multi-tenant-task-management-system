import { AppDataSource } from "./config/data-source.js";
import { UserController } from "./controller/user.controller.js";
import { PlatformExpress } from "@tsed/platform-express";
import { Configuration, Inject } from "@tsed/di";
import express from "express";
import { UserService } from "./service/user.service.js";
import { TenantController } from "./controller/tenant.controller.js";
import { TenantService } from "./service/tenant.service.js";
import { PlatformApplication } from "@tsed/common";

@Configuration({
  mount: {
    "/api": [UserController, TenantController],
  },
  imports: [UserController, UserService, TenantController, TenantService],
})
export class AppServer {
  constructor(private app: PlatformApplication) {}

  $beforeRoutesInit() {
    this.app.use(express.json()); // ✅ Correctly register JSON middleware
    this.app.use(express.urlencoded({ extended: true })); // Optional: for form data
  }
}

// const bootstrap = async () => {
//   try {
//     await AppDataSource.initialize();
//     console.log("Database connected! ✅");

//     // 🟢 Use await here to get the actual app instance
//     const app = await PlatformExpress.bootstrap(AppServer);
//     app.listen({ port: 3000 }); // 🟢 Await this as well

//     console.log("Server is running at http://localhost:3000 🚀");
//   } catch (error) {
//     console.error("Database connection failed ❌", error);
//   }
// };

// bootstrap();
const bootstrap = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected! ✅");

    const platform = await PlatformExpress.bootstrap(AppServer); // Get the PlatformExpress instance
    const app = platform.app.rawApp; // Get the Express app
    app.use(express.json()); // ✅ Ensure JSON body is parsed
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000 🚀");
    });
  } catch (error) {
    console.error("Database connection failed ❌", error);
  }
};

bootstrap();

// async function bootstrap() {
//   try {
//     const platform = await PlatformExpress.bootstrap(AppServer, (app: any) => {
//       app.use(express.json()); // ✅ Ensure JSON body is parsed
//       app.use((req: { body: any }, res: any, next: () => void) => {
//         console.log("Middleware executed - Body:", req.body);
//         next();
//       });
//     });
//     await platform.listen();
//     console.log("Server started on http://localhost:8080");
//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }

// bootstrap();
