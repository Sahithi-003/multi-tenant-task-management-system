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
import { privateDecrypt } from "crypto";

@Controller("/projects")
export class ProjectController {
  constructor(
    @Inject() private projectService: ProjectService,
    @Inject() private tenantService: TenantService,
    @Inject() private userService: UserService
  ) {}

  // @Inject()
  // private tenantService: TenantService;
  // @Inject()
  // private userService: UserService;

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
