import { Tenant } from "../entity/tenant";
import { User } from "../entity/user";

export interface DataRepository<T> {
  create(datum: T): Promise<T>;
  update(datum: T): Promise<T>;
  getById(id: string): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface TenantRepository extends DataRepository<Tenant> {}
export interface UserRepository extends DataRepository<User> {}
