import Category from '@modules/product/infra/typeorm/entities/Category';
import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

@injectable()
class FindCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    sort,
    page,
    limit,
    ...filters
  }: IFiltersDTO): Promise<IPaginatedResponseDTO<Category>> {
    const result = await this.categoryRepository.find({
      sort,
      page,
      limit,
      ...filters,
    });

    return result;
  }
}

export default FindCategoryService;
