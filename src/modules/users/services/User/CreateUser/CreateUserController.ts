import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from './CreateUserService';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const file = request.file ? request.file.filename : undefined;
    const { name, email, phone, password, roles } = request.body;

    const creatUserService = container.resolve(CreateUserService);

    const user = await creatUserService.execute({
      name,
      email,
      phone,
      password,
      roles,
      filename: file,
      user_id: id,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default CreateUserController;
