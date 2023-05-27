import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Token não encontrado!', 404);
    }

    if (this.dateProvider.compareIfBefore(userToken.expires_date, new Date())) {
      throw new AppError('Token expirado!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    user.password = await hash(password, 8);

    await this.usersRepository.update(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export default ResetPasswordService;
