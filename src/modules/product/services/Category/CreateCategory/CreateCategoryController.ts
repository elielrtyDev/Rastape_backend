import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from './CreateCategoryService';

class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const user_id = request.user.id;

    const createCategoryService = container.resolve(CreateCategoryService);

    const result = await createCategoryService.execute({
      name,
      user_id,
    });

    return response.status(201).json(classToClass(result));
  }
}

export default CreateCategoryController;
