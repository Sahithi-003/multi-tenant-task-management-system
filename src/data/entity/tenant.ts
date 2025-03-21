import { Column, Entity, Index, OneToMany } from "typeorm";
import { IdentifiableEntity } from "./identifiable.entity.js";
import { User } from "./user.js";
import { Project } from "./project.js";

@Entity()
export class Tenant extends IdentifiableEntity {
  // @Index({ unique: true })
  @Column({ type: "varchar", length: 255 })
  name: string;
  @OneToMany(() => User, (user) => user.tenant)
  users: User[];
  @OneToMany("Project", "tenant")
  projects: Project[];
}
