import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindRulesByIdService from './FindRulesByIdService';

class FindRulesByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const service = container.resolve(FindRulesByIdService);

    const result = await service.execute(id);

    return response.json(classToClass(result));
  }
}

export default FindRulesByIdController;
