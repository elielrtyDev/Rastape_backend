import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from './AuthenticateUserService';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const session = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(classToClass(session));
  }
}

export default AuthenticateUserController;
