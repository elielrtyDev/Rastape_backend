import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCategoryService from './UpdateCategoryService';

class UpdateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;
    const { id } = request.params;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const result = await updateCategoryService.execute({
      category_id: id,
      name,
      user_id,
    });

    return response.json(classToClass(result));
  }
}

export default UpdateCategoryController;
