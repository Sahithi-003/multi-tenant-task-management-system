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
import { UserService } from "../service/user.service.js";
import { User } from "../data/entity/user";

@Controller("/users")
export class UserController {
  constructor(@Inject() private userService: UserService) {
    // ✅ Inject UserService explicitly
    // console.log("UserController initialized! ✅", this.userService);
  }
  protected getService(): UserService {
    return this.userService;
  }

  @Get()
  async findAll(
    @Req() req: Express.Request,
    @Res() res: Response,
    @QueryParams() params: any
  ): Promise<void> {
    try {
      const users = await this.getService().getAll();
      res.json(users);
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching users." });
    }
  }

  @Get("/:id")
  async findOne(
    @Req() req: Express.Request,
    @PathParams("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const user = await this.getService().getById(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching user." });
    }
  }

  @Post()
  async create(
    @Req() req: Request & { body: User },
    @Res() res: Response
  ): Promise<void> {
    try {
      if (!req.body) {
        res.status(400).json({ error: "User data is required." });
        return;
      }
      const user = await this.getService().create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating user." });
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
      res.json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting user." });
    }
  }
}
