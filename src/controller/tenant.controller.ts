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
import { TenantService } from "../service/tenant.service.js";
import { Tenant } from "../data/entity/tenant";

@Controller("/tenants")
export class TenantController {
  constructor(@Inject() private tenantService: TenantService) {}
  protected getService(): TenantService {
    return this.tenantService;
  }

  @Get()
  async findAll(
    @Req() req: Express.Request,
    @Res() res: Response,
    @QueryParams() params: any
  ): Promise<void> {
    try {
      const tenants = await this.getService().getAll();
      res.json(tenants);
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching tenants." });
    }
  }

  @Get("/:id")
  async findOne(
    @Req() req: Express.Request,
    @PathParams("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const tenant = await this.getService().getById(id);
      res.json(tenant);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching tenant." });
    }
  }

  @Post()
  async create(
    @Req() req: Request & { body: Tenant },
    @Res() res: Response
  ): Promise<void> {
    try {
      console.log("req.body", req.body);
      if (!req.body) {
        res.status(400).json({ error: "Tenant data is required." });
        return;
      }
      const tenant = await this.getService().create(req.body);
      res.json(tenant);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating Tenant." });
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
