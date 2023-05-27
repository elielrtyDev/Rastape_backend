import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRulesService from './CreateRolesService';

class CreateRolesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, type } = request.body;
    const user_id = request.user.id;

    const creatRulesService = container.resolve(CreateRulesService);

    const role = await creatRulesService.execute({
      name,
      description,
      type,
      user_id,
    });

    return response.status(201).json(classToClass(role));
  }
}

export default CreateRolesController;
