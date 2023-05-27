import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindUserService from './FindUserService';

export default class FindMatchController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { sort, page, limit, ...filters } = request.query;

    const service = container.resolve(FindUserService);

    const result = await service.execute({
      sort: sort as string,
      page: page as string,
      limit: limit as string,
      ...filters,
    });

    return response.json(classToClass(result));
  }
}
