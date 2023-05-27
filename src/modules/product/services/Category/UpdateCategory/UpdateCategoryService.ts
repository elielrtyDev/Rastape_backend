import Category from '@modules/product/infra/typeorm/entities/Category';
import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  category_id: string;
  name: string;
  user_id: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    name,
    user_id,
    category_id,
  }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Categoria não encontrada!', 404);
    }

    const checkCategoryExists = await this.categoryRepository.findByName(name);

    if (checkCategoryExists) {
      throw new AppError('Nome já cadastrado!');
    }

    category.name = name || category.name;

    category.updated_by = user_id;
    category.updated_at = new Date();

    await this.categoryRepository.update(category);

    return category;
  }
}

export default UpdateCategoryService;
