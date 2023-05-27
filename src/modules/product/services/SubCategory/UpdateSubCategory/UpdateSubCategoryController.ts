import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateSubCategoryService from './UpdateSubCategoryService';

class UpdateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, category_id } = request.body;
    const { id } = request.params;

    const updateSubCategoryService = container.resolve(
      UpdateSubCategoryService,
    );

    const result = await updateSubCategoryService.execute({
      category_id,
      name,
      user_id,
      sub_category_id: id,
    });

    return response.json(classToClass(result));
  }
}

export default UpdateCategoryController;
