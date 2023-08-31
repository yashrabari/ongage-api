import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserIntegrations } from "./UserIntegrations.Model";

@Entity()
export class MasterIntegration {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  integrationPartner: string;

  @Column()
  logoPath: string;

  @Column()
  internalType: number;

  @OneToMany(
    () => UserIntegrations,
    (userIntegrations) => userIntegrations.masterIntegration
  )
  userIntegrations: UserIntegrations[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
