import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AuditingEntity } from '@shared/infra/typeorm/entities/AuditingEntity';

import User from './User';

@Entity('user_token')
class UserToken extends AuditingEntity {
  @Column()
  refresh_token: string;

  @Column('boolean')
  fcm_token: boolean;

  @Column('timestamp with time zone')
  expires_date: Date;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default UserToken;
