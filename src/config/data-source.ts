// config/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../data/entity/user.js";
import { Tenant } from "../data/entity/tenant.js";
import dotenv from "dotenv";
import { Project } from "../data/entity/project.js";
import { Task } from "../data/entity/task.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "3306"),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Tenant, Project, Task],
});
