import upload from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, OneToMany } from 'typeorm';

import { AuditingEntity } from '@shared/infra/typeorm/entities/AuditingEntity';

import UserRole from './UserRole';
import UserToken from './UserToken';

@Entity('user')
class User extends AuditingEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Expose({ name: 'phone' })
  getUserPhone(): string {
    const ddd = this.phone.slice(0, 2);
    const firstDigit = this.phone.slice(2, 3);
    const firstHalf = this.phone.slice(3, 7);
    const secondHalf = this.phone.slice(7, 11);

    const phone = `(${ddd}) ${firstDigit} ${firstHalf}-${secondHalf}`;

    return phone;
  }

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  avatar: string;

  @Expose({ name: 'profile_photo' })
  getAvatarURL(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (upload.driver) {
      case 'disk':
        return `${process.env.API_URL}/avatars/${this.avatar}`;
      case 's3':
        return `${upload.config.aws.bucket_url}/avatars/${this.avatar}`;
      default:
        return null;
    }
  }

  @OneToMany(() => UserToken, userToken => userToken.user)
  tokens: UserToken[];

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRole: UserRole[];
}

export default User;
