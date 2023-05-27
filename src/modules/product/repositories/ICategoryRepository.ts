import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  find(filters: IFiltersDTO): Promise<IPaginatedResponseDTO<Category>>;
  delete(id: string): Promise<void>;
}

export default ICategoryRepository;
