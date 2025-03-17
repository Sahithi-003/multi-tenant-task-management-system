import { Column, Entity, ManyToOne } from "typeorm";
import { IdentifiableEntity } from "./identifiable.entity.js";
import { Project } from "./project.js";
import { User } from "./user.js";

@Entity()
export class Task extends IdentifiableEntity {
  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne("Project", "tasks")
  project: Project;

  @ManyToOne(() => User)
  assignedTo: User;

  @Column({
    type: "enum",
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  })
  status: string;
}
