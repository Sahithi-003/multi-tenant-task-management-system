import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { Injectable } from "@tsed/di";
import { TaskRepository } from "../data/repository/task.repository.js";
import { Task } from "../data/entity/task.js";

@Injectable()
export class TaskService implements TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async create(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async update(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async getById(id: string): Promise<Task> {
    const res = await this.repository.findOne({ where: { id } });
    if (!res) {
      throw new Error("Task not found");
    }
    return res;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getAll(): Promise<Task[]> {
    return this.repository.find();
  }
}
