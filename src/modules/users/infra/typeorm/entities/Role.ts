import { Entity, Column, OneToMany } from 'typeorm';

import { AuditingEntity } from '@shared/infra/typeorm/entities/AuditingEntity';

import UserRole from './UserRole';

@Entity('role')
class Role extends AuditingEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRole: UserRole[];
}

export default Role;
