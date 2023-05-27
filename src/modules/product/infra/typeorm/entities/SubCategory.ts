import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { AuditingEntity } from '@shared/infra/typeorm/entities/AuditingEntity';

import Category from './Category';

@Entity('subcategory')
class SubCategory extends AuditingEntity {
  @Column()
  name: string;

  @Column('uuid')
  category_id: string;

  @ManyToOne(() => Category, category => category.subCategory)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}

export default SubCategory;
