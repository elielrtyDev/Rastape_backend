import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindUserByIdService from './FindUserByIdService';

class FindUserByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = container.resolve(FindUserByIdService);

    const result = await service.execute(id);

    return response.json(result);
  }
}

export default FindUserByIdController;
