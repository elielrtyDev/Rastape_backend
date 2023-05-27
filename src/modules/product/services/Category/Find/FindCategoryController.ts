import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCategoryService from './FindCategoryService';

export default class FindCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { sort, page, limit, ...filters } = request.query;

    const service = container.resolve(FindCategoryService);

    const result = await service.execute({
      sort: sort as string,
      page: page as string,
      limit: limit as string,
      ...filters,
    });

    return response.json(classToClass(result));
  }
}
