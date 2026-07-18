import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RequestStatus } from '../enum/request-status-enum';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.SUBMITTED,
  })
  status!: RequestStatus;

  @Column({
    type: 'text',
    nullable: false,
  })
  description!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
export { RequestStatus };
