import { Tenant } from "../entity/tenant";
import { DataRepository } from "./repository";

export interface TenantRepository extends DataRepository<Tenant> {}
