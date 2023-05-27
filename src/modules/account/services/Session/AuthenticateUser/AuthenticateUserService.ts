import authConfig from '@config/auth';
import Role from '@modules/users/infra/typeorm/entities/Role';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersRolesRepository from '@modules/users/repositories/IUsersRolesRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
  roles: Role[];
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRolesRepository')
    private usersRolesRepository: IUsersRolesRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email ou senha incorretos!', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('email ou senha incorretos!', 401);
    }

    const {
      token_secret,
      token_expires_in,
      refresh_token_secret,
      refresh_token_expires_in,
      refresh_token_expire_days,
    } = authConfig.jwt;

    const usersRoles = await this.usersRolesRepository.findByUserId(user.id);

    const roles = usersRoles.map(userRole => {
      return userRole.role;
    });

    const token = sign({}, token_secret, {
      subject: user.id,
      expiresIn: token_expires_in,
    });

    const refresh_token = sign({}, refresh_token_secret, {
      subject: user.id,
      expiresIn: refresh_token_expires_in,
    });

    const now = new Date();
    const expires_date = this.dateProvider.addDays(
      now,
      refresh_token_expire_days,
    );
    expires_date.setUTCDate(this.dateProvider.getDay(now));

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    });

    return {
      user,
      token,
      refresh_token,
      roles,
    };
  }
}

export default AuthenticateUserService;
