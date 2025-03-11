// import { Repository } from "typeorm";
// import { User } from "../data/entity/user";
// import { UserRepository } from "../data/repository/repository";

// export class UserService implements UserRepository {
//   private repository: Repository<User>;

//   constructor(repository: Repository<User>) {
//     this.repository = repository;
//   }

//   async create(user: User): Promise<User> {
//     return this.repository.save(user);
//   }
//   async update(user: User): Promise<User> {
//     return this.repository.save(user);
//   }
//   async getById(id: string): Promise<User> {
//     const res = await this.repository.findOne({ where: { id } });
//     if (!res) {
//       throw new Error("User not found");
//     }
//     return res;
//   }
//   async delete(id: string): Promise<void> {
//     await this.repository.delete(id);
//   }
//   async getAll(): Promise<User[]> {
//     return this.repository.find();
//   }
// }
import { Repository } from "typeorm";
import { User } from "../data/entity/user.js";
import { UserRepository } from "../data/repository/repository.js";
import { AppDataSource } from "../config/data-source.js";
import { Injectable, Service } from "@tsed/di";

@Injectable()
export class UserService implements UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async update(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async getById(id: string): Promise<User> {
    const res = await this.repository.findOne({ where: { id } });
    if (!res) {
      throw new Error("User not found");
    }
    return res;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getAll(): Promise<User[]> {
    return this.repository.find();
  }
}
