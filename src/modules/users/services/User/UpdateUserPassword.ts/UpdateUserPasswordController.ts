import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserPasswordService from './UpdateUserPasswordService';

class UpdateUserPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { old_password, password } = request.body;

    const updateUserPasswordService = container.resolve(
      UpdateUserPasswordService,
    );

    await updateUserPasswordService.execute({
      user_id: id,
      old_password,
      password,
    });

    return response.status(204).send();
  }
}

export default UpdateUserPasswordController;
