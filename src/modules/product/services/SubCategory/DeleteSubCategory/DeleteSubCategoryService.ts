import ISubCategoryRepository from '@modules/product/repositories/ISubCategoryRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('SubCategoryRepository')
    private subCategoryRepository: ISubCategoryRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const subCategory = await this.subCategoryRepository.findById(id);

    if (!subCategory) {
      throw new AppError('SubCategoria não encontrada!', 404);
    }

    subCategory.updated_by = user_id;
    subCategory.updated_at = new Date();

    await this.subCategoryRepository.update(subCategory);

    await this.subCategoryRepository.delete(id);
  }
}

export default DeleteCategoryService;
