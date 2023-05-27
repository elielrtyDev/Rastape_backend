import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserPersonalDataService from './UpdateUserPersonalDataService';

class UpdateUserPersonalDataController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, phone, email } = request.body;
    const { id } = request.params;

    const updateUserPersonalDataService = container.resolve(
      UpdateUserPersonalDataService,
    );

    const user = await updateUserPersonalDataService.execute({
      email,
      id,
      name,
      user_id,
      phone,
    });

    return response.json(classToClass(user));
  }
}

export default UpdateUserPersonalDataController;
