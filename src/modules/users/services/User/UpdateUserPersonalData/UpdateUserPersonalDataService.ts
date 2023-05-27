import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest extends Omit<ICreateUserDTO, 'password'> {
  user_id: string;
  id: string;
}

@injectable()
class UpdateUserPersonalDataService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    phone,
    email,
    user_id,
    id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }
    if (email) {
      const userWithPassedEmail = await this.usersRepository.findByEmail(email);

      if (userWithPassedEmail && userWithPassedEmail.id !== user_id) {
        throw new AppError('E-mail já usado.');
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.updated_at = new Date();
    user.updated_by = user_id;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserPersonalDataService;
