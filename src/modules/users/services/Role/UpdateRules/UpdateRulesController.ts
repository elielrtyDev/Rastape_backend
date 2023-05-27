import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateRulesService from './UpdateRulesService';

class UpdateRulesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, description, type } = request.body;
    const { id } = request.params;

    const updateRulesService = container.resolve(UpdateRulesService);

    const rules = await updateRulesService.execute({
      role_id: id,
      name,
      description,
      type,
      user_id,
    });

    return response.json(classToClass(rules));
  }
}

export default UpdateRulesController;
