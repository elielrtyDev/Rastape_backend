import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSubCategoryService from './CreateSubCategoryService';

class CreateSubCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, category_id } = request.body;
    const user_id = request.user.id;

    const createSubCategoryService = container.resolve(
      CreateSubCategoryService,
    );

    const result = await createSubCategoryService.execute({
      name,
      user_id,
      category_id,
    });

    return response.status(201).json(classToClass(result));
  }
}

export default CreateSubCategoryController;
