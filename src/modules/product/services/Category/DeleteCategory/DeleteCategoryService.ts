import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada!', 404);
    }

    category.updated_by = user_id;
    category.updated_at = new Date();

    await this.categoryRepository.update(category);

    await this.categoryRepository.delete(id);
  }
}

export default DeleteCategoryService;
