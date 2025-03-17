import { Project } from "../entity/project";
import { DataRepository } from "./repository";

export interface ProjectRepository extends DataRepository<Project> {}
