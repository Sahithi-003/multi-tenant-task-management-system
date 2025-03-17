import {
  Controller,
  Delete,
  Get,
  Inject,
  PathParams,
  Post,
  QueryParams,
  Req,
  Res,
} from "@tsed/common";
import { Request } from "express";
import { Response } from "express";
import { ProjectService } from "../service/project.service.js";
import { UserService } from "../service/user.service.js";
import { TaskService } from "../service/task.service.js";
import { Task } from "../data/entity/task.js";

@Controller("/tasks")
export class TaskController {
  constructor(
    @Inject() private taskService: TaskService,
    @Inject() private projectService: ProjectService,
    @Inject() private userService: UserService
  ) {}

  protected getService(): TaskService {
    return this.taskService;
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @QueryParams() params: any
  ): Promise<void> {
    try {
      const tasks = await this.getService().getAll();
      res.json(tasks);
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching tasks." });
    }
  }

  @Get("/:id")
  async findOne(
    @Req() req: Express.Request,
    @PathParams("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const task = await this.getService().getById(id);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching task." });
    }
  }

  @Post()
  async create(
    @Req() req: Request & { body: Task },
    @Res() res: Response
  ): Promise<void> {
    const { title, description, projectId, assignedToId } = req.body;

    try {
      if (!req.body) {
        res.status(400).json({ error: "Task data is required." });
        return;
      }
      const project = await this.projectService.getById(projectId);
      const user = await this.userService.getById(assignedToId);

      if (!project || !user) {
        res.status(400).json({ message: "Invalid project or user" });
        return;
      }

      const task = new Task();
      task.title = title;
      task.description = description;
      task.project = project;
      task.assignedTo = user;

      await this.getService().create(task);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating Task." });
    }
  }

  @Delete("/:id")
  async remove(
    @Req() req: Express.Request,
    @PathParams("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.getService().delete(id);
      res.json({ message: "Tenant deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting Tenant." });
    }
  }
}
