import ICreateSubCategoryDTO from '@modules/product/dtos/ICreateSubCategoryDTO';
import ISubCategoryRepository from '@modules/product/repositories/ISubCategoryRepository';
import { getRepository, Repository } from 'typeorm';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';
import filterAndPaginate from '@shared/utils/filterAndPaginate';

import SubCategory from '../entities/SubCategory';

class SubCategoryRepository implements ISubCategoryRepository {
  private ormRepository: Repository<SubCategory>;

  constructor() {
    this.ormRepository = getRepository(SubCategory);
  }

  public async create({
    name,
    user_id,
    category_id,
  }: ICreateSubCategoryDTO): Promise<SubCategory> {
    const subCategory = this.ormRepository.create({
      name,
      category_id,
      created_by: user_id,
    });

    await this.ormRepository.save(subCategory);

    return subCategory;
  }

  public async update(subCategory: SubCategory): Promise<SubCategory> {
    return this.ormRepository.save(subCategory);
  }

  public async findById(id: string): Promise<SubCategory | undefined> {
    const subCategory = await this.ormRepository.findOne({ id });

    return subCategory;
  }

  public async findByName(name: string): Promise<SubCategory | undefined> {
    const subCategory = await this.ormRepository.findOne({ name });

    return subCategory;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async find(
    filters: IFiltersDTO,
  ): Promise<IPaginatedResponseDTO<SubCategory>> {
    const query = this.ormRepository
      .createQueryBuilder('entity')
      .limit(Number(filters.limit))
      .skip(Number(filters.limit) * Number(filters.page))
      .orderBy('created_at');

    const result = await filterAndPaginate<SubCategory>(query, filters);

    return result;
  }
}

export default SubCategoryRepository;
