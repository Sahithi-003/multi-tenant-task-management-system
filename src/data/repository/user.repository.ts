import { User } from "../entity/user";
import { DataRepository } from "./repository";

export interface UserRepository extends DataRepository<User> {}
