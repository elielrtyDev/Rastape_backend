import ICreateCategoryDTO from '@modules/product/dtos/ICreateCategoryDTO';
import Category from '@modules/product/infra/typeorm/entities/Category';
import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    name,
    user_id,
  }: ICreateCategoryDTO): Promise<Category> {
    const checkCategoryExists = await this.categoryRepository.findByName(name);

    if (checkCategoryExists) {
      throw new AppError('Nome já cadastrado!');
    }

    const category = await this.categoryRepository.create({
      name,
      user_id,
    });

    return category;
  }
}

export default CreateCategoryService;
