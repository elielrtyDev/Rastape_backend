import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AuditingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column('uuid')
  created_by: string;

  @Exclude()
  @Column('uuid')
  updated_by: string;

  @Exclude()
  @Column('uuid')
  deleted_by: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}
