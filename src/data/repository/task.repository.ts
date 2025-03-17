import { Task } from "../entity/task";
import { DataRepository } from "./repository";

export interface TaskRepository extends DataRepository<Task> {}
