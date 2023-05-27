import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

import ICreateSubCategoryDTO from '../dtos/ICreateSubCategoryDTO';
import SubCategory from '../infra/typeorm/entities/SubCategory';

interface ISubCategoryRepository {
  create(data: ICreateSubCategoryDTO): Promise<SubCategory>;
  update(subCategory: SubCategory): Promise<SubCategory>;
  findById(id: string): Promise<SubCategory | undefined>;
  findByName(name: string): Promise<SubCategory | undefined>;
  find(filters: IFiltersDTO): Promise<IPaginatedResponseDTO<SubCategory>>;
  delete(id: string): Promise<void>;
}

export default ISubCategoryRepository;
