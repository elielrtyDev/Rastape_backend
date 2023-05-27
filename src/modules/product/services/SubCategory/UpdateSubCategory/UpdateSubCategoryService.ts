import SubCategory from '@modules/product/infra/typeorm/entities/SubCategory';
import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import ISubCategoryRepository from '@modules/product/repositories/ISubCategoryRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  category_id: string;
  name: string;
  user_id: string;
  sub_category_id: string;
}

@injectable()
class UpdateSubCategoryService {
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
    sub_category_id,
  }: IRequest): Promise<SubCategory> {
    const checkSubCategoryExistsById =
      await this.subCategoryRepository.findById(sub_category_id);

    if (!checkSubCategoryExistsById) {
      throw new AppError('SubCategoria não encontrada!', 404);
    }

    const checkCategoryExists = await this.categoryRepository.findById(
      category_id,
    );

    if (!checkCategoryExists) {
      throw new AppError('Categoria não encontrada!', 404);
    }

    const checkSubCategoryExistsByname =
      await this.subCategoryRepository.findByName(name);

    if (
      checkSubCategoryExistsByname &&
      checkSubCategoryExistsByname.id !== checkSubCategoryExistsById.id
    ) {
      throw new AppError('Nome já cadastrado!');
    }

    checkSubCategoryExistsById.name = name || checkSubCategoryExistsById.name;

    checkSubCategoryExistsById.updated_by = user_id;
    checkSubCategoryExistsById.updated_at = new Date();

    await this.subCategoryRepository.update(checkSubCategoryExistsById);

    return checkSubCategoryExistsById;
  }
}

export default UpdateSubCategoryService;
