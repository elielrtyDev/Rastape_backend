import SubCategory from '@modules/product/infra/typeorm/entities/SubCategory';
import ISubCategoryRepository from '@modules/product/repositories/ISubCategoryRepository';
import { inject, injectable } from 'tsyringe';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

@injectable()
class FindSubCategoryService {
  constructor(
    @inject('SubCategoryRepository')
    private subCategoryRepository: ISubCategoryRepository,
  ) {}

  public async execute({
    sort,
    page,
    limit,
    ...filters
  }: IFiltersDTO): Promise<IPaginatedResponseDTO<SubCategory>> {
    const result = await this.subCategoryRepository.find({
      sort,
      page,
      limit,
      ...filters,
    });

    return result;
  }
}

export default FindSubCategoryService;
