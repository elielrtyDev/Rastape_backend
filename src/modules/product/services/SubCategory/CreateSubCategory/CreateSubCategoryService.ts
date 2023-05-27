import ICreateSubCategoryDTO from '@modules/product/dtos/ICreateSubCategoryDTO';
import SubCategory from '@modules/product/infra/typeorm/entities/SubCategory';
import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import ISubCategoryRepository from '@modules/product/repositories/ISubCategoryRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateSubCategoryService {
  constructor(
    @inject('SubCategoryRepository')
    private subCategoryRepository: ISubCategoryRepository,
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    name,
    user_id,
    category_id,
  }: ICreateSubCategoryDTO): Promise<SubCategory> {
    const checkSubCategoryExists = await this.subCategoryRepository.findByName(
      name,
    );

    if (checkSubCategoryExists) {
      throw new AppError('Nome já cadastrado!');
    }

    const checkCategoryExists = await this.categoryRepository.findById(
      category_id,
    );

    if (!checkCategoryExists) {
      throw new AppError('categoria não encontrada!', 404);
    }

    const categorySub = await this.subCategoryRepository.create({
      name,
      user_id,
      category_id,
    });

    return categorySub;
  }
}

export default CreateSubCategoryService;
