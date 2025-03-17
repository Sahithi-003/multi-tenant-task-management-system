import { AppDataSource } from "./config/data-source.js";
import { UserController } from "./controller/user.controller.js";
import { PlatformExpress } from "@tsed/platform-express";
import { Configuration, Inject } from "@tsed/di";
import express from "express";
import { UserService } from "./service/user.service.js";
import { TenantController } from "./controller/tenant.controller.js";
import { TenantService } from "./service/tenant.service.js";
import { PlatformApplication } from "@tsed/common";
import { TaskController } from "./controller/task.controller.js";
import { ProjectController } from "./controller/project.controller.js";
import { ProjectService } from "./service/project.service.js";
import { TaskService } from "./service/task.service.js";

@Configuration({
  mount: {
    "/api": [
      UserController,
      TenantController,
      TaskController,
      ProjectController,
    ],
  },
  imports: [
    UserController,
    UserService,
    TenantController,
    TenantService,
    ProjectController,
    ProjectService,
    TaskController,
    TaskService,
  ],
})
export class AppServer {
  constructor(private app: PlatformApplication) {}

  $beforeRoutesInit() {
    this.app.use(express.json()); // ✅ Correctly register JSON middleware
    this.app.use(express.urlencoded({ extended: true })); // Optional: for form data
  }
}
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
