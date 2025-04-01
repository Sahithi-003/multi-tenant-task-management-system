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
import { Project } from "../data/entity/project.js";
import { TenantService } from "../service/tenant.service.js";
import { UserService } from "../service/user.service.js";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { cacheGet, cacheSet } from "../cache.js";

@Controller("/projects")
export class ProjectController {
  private repository: Repository<Project>;

  constructor(
    @Inject() private projectService: ProjectService,
    @Inject() private tenantService: TenantService,
    @Inject() private userService: UserService
  ) {
    this.repository = AppDataSource.getRepository(Project);
  }

  protected getService(): ProjectService {
    return this.projectService;
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @QueryParams() params: any
  ): Promise<void> {
    try {
      const projects = await this.getService().getAll();
      res.json(projects);
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching projects." });
    }
  }

  @Get("/with-tasks")
  async getProjectsWithTasks(@Res() res: Response): Promise<void> {
    try {
      const projects = await this.repository.find({
        relations: ["tasks", "owner", "tenant"],
      });
      res.json(projects);
      res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects with tasks:", error);
      res.status(500).json({ message: "Error fetching projects", error });
    }
  }

  @Get("/:id/tasks/stats")
  async getProjectTaskStats(
    @PathParams("id") id: string,
    req: Request,
    res: Response
  ) {
    try {
      const project = await this.repository.findOne({
        where: { id: id },
        relations: ["tasks"],
      });

      if (!project)
        return res.status(404).json({ message: "Project not found" });

      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(
        (t) => t?.status === "Completed"
      ).length;

      res.json({ id, totalTasks, completedTasks });
      return res.status(200).json({ id, totalTasks, completedTasks });
    } catch (error) {
      res
        ?.status(500)
        .json({ message: "Error fetching project task stats", error });
    }
  }

  @Get("/:id/tasks/stats/v2")
  async getProjectTaskStatsV2(
    @PathParams("id") id: string,
    req: Request,
    res: Response
  ) {
    // const { id } = req.params;
    const cacheKey = `project:${id}:taskStats`;

    const cachedData = await cacheGet(cacheKey);
    console.log("cachedData", cachedData);
    if (cachedData) return res?.json(cachedData);

    try {
      const project = await this.repository.findOne({
        where: { id: id },
        relations: ["tasks"],
      });

      if (!project)
        return res.status(404).json({ message: "Project not found" });
      console.log("project", project);

      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(
        (t) => t.status === "Completed"
      ).length;

      console.log("completedTasks", completedTasks);
      const data = { id, totalTasks, completedTasks };

      await cacheSet(cacheKey, data, 300);
      res.json(data);
      return res.status(200).json({ id, totalTasks, completedTasks });
    } catch (error) {
      res
        ?.status(500)
        .json({ message: "Error fetching project task stats", error });
    }
  }

  @Get("/:id")
  async findOne(
    @Req() req: Express.Request,
    @PathParams("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const project = await this.getService().getById(id);
      res.json(project);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching project." });
    }
  }

  @Post()
  async create(
    @Req() req: Request & { body: Project },
    @Res() res: Response
  ): Promise<void> {
    const { name, tenantId, ownerId } = req.body;
    try {
      if (!req.body) {
        res.status(400).json({ error: "Project data is required." });
        return;
      }
      const tenant = await this.tenantService.getById(tenantId);
      const owner = await this.userService.getById(ownerId);

      if (!tenant || !owner) {
        res.status(400).json({ message: "Invalid tenant or owner" });
        return;
      }

      const project = new Project();
      project.name = name;
      project.tenant = tenant;
      project.owner = owner;
      await this.getService().create(project);
      res.status(201).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating Project." });
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
