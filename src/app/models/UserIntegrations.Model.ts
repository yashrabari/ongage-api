import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { MasterIntegration } from "./MasterIntegration.Model";

@Entity()
export class UserIntegrations {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  userId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  combination: string;

  //create many to one relationship with MasterIntegration
  @ManyToOne(
    () => MasterIntegration,
    (masterIntegration) => masterIntegration.id
  )
  masterIntegration: MasterIntegration;

  @Column()
  accountCode: string;

  @Column({ default: false })
  isTestCampaign: boolean;

  @Column({ default: false })
  listAutomatically: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
