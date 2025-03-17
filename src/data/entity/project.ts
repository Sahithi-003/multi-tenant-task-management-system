import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { IdentifiableEntity } from "./identifiable.entity.js";
import { Tenant } from "./tenant.js";
import { User } from "./user.js";
import { Task } from "./task.js";

@Entity()
export class Project extends IdentifiableEntity {
  // @Index()
  @Column({ type: "varchar", length: 255 })
  name: string;

  @ManyToOne("Tenant", "projects")
  tenant: Tenant;

  @ManyToOne(() => User)
  owner: User;

  @OneToMany("Task", "project")
  tasks: Task[];
}
