import { Entity, Column, OneToMany } from 'typeorm';

import { AuditingEntity } from '@shared/infra/typeorm/entities/AuditingEntity';

import SubCategory from './SubCategory';

@Entity('category')
class Category extends AuditingEntity {
  @Column()
  name: string;

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategory: SubCategory[];
}

export default Category;
