import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { Injectable } from "@tsed/di";
import { ProjectRepository } from "../data/repository/project.repository.js";
import { Project } from "../data/entity/project.js";

@Injectable()
export class ProjectService implements ProjectRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = AppDataSource.getRepository(Project);
  }

  async create(project: Project): Promise<Project> {
    return this.repository.save(project);
  }

  async update(project: Project): Promise<Project> {
    return this.repository.save(project);
  }

  async getById(id: string): Promise<Project> {
    const res = await this.repository.findOne({ where: { id } });
    if (!res) {
      throw new Error("Project not found");
    }
    return res;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getAll(): Promise<Project[]> {
    return this.repository.find();
  }
}
