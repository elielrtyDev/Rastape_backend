import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from './UpdateUserAvatarService';

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: id,
      file: filename,
    });

    return response.json(classToClass(user));
  }
}

export default UpdateUserAvatarController;
