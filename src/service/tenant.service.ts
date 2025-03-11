import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { Injectable, Service } from "@tsed/di";
import { TenantRepository } from "../data/repository/tenant.repository.js";
import { Tenant } from "../data/entity/tenant.js";

@Injectable()
export class TenantService implements TenantRepository {
  private repository: Repository<Tenant>;

  constructor() {
    this.repository = AppDataSource.getRepository(Tenant);
  }

  async create(user: Tenant): Promise<Tenant> {
    return this.repository.save(user);
  }

  async update(user: Tenant): Promise<Tenant> {
    return this.repository.save(user);
  }

  async getById(id: string): Promise<Tenant> {
    const res = await this.repository.findOne({ where: { id } });
    if (!res) {
      throw new Error("Tenant not found");
    }
    return res;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getAll(): Promise<Tenant[]> {
    return this.repository.find();
  }
}
