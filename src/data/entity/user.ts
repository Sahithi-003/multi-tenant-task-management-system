import { Column, Entity, Index, ManyToOne } from "typeorm";
import { IdentifiableEntity } from "./identifiable.entity.js";
import { Tenant } from "./tenant.js";

@Entity()
export class User extends IdentifiableEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;
  @Index()
  @Column({ type: "varchar", unique: true })
  email: string;
  @Column({ type: "varchar" })
  password: string;
  @Column({ type: "enum", enum: ["admin", "user"], default: "user" })
  role: string;
  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  tenant: Tenant;
}
