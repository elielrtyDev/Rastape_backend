import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { AuditingEntity } from '@shared/infra/typeorm/entities/AuditingEntity';

import Role from './Role';
import User from './User';

@Entity('user_role')
class UserRole extends AuditingEntity {
  @Column('uuid')
  user_id: string;

  @Column('uuid')
  role_id: string;

  @ManyToOne(() => User, user => user.userRole)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, role => role.userRole, {
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}

export default UserRole;
