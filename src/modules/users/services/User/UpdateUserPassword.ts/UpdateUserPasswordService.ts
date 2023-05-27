import { inject, injectable } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  old_password: string;
  password: string;
}

@injectable()
class UpdateUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    old_password,
    password,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      old_password,
      user.password,
    );

    if (!checkOldPassword) {
      throw new AppError('Senha inválida!');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.update(user);
  }
}

export default UpdateUserPasswordService;
