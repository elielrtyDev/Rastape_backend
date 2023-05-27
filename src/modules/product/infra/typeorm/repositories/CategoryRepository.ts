import ICreateCategoryDTO from '@modules/product/dtos/ICreateCategoryDTO';
import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';
import filterAndPaginate from '@shared/utils/filterAndPaginate';

import Category from '../entities/Category';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({
    name,
    user_id,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ name, created_by: user_id });

    await this.ormRepository.save(category);

    return category;
  }

  public async update(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ id });

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({ name });

    return category;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async find(
    filters: IFiltersDTO,
  ): Promise<IPaginatedResponseDTO<Category>> {
    const query = this.ormRepository
      .createQueryBuilder('entity')
      .limit(Number(filters.limit))
      .skip(Number(filters.limit) * Number(filters.page))
      .orderBy('created_at');

    const result = await filterAndPaginate<Category>(query, filters);

    return result;
  }
}

export default CategoryRepository;
