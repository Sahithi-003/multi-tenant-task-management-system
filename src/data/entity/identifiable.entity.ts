import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Identifiable } from "../type/identifiable";
import { generateId } from "../../service/utils.js";

export class IdentifiableEntity implements Identifiable {
  // @PrimaryColumn({ type: "char", length: 12 })
  // id: string = generateId(12);
  @PrimaryGeneratedColumn("uuid") // ✅ Auto-generate a UUID
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
