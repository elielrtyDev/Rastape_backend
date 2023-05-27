import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteRulesService from '@modules/users/services/Role/DeleteRules/DeleteRulesService';

class DeleteRulesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const service = container.resolve(DeleteRulesService);

    await service.execute({ id, user_id });

    return response.status(204).send();
  }
}

export default DeleteRulesController;
