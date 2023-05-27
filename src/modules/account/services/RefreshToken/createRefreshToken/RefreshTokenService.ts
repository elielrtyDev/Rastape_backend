import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/models/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  admin: boolean;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute(refresh_token: string): Promise<IResponse> {
    const {
      refresh_token_secret,
      refresh_token_expires_in,
      refresh_token_expire_days,
      token_secret,
      token_expires_in,
    } = auth.jwt;

    try {
      const { sub, admin } = verify(
        refresh_token,
        refresh_token_secret,
      ) as IPayload;

      const user_id = sub;

      const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token,
      );

      if (!userToken) {
        throw new AppError('Refresh Token não encontrado!', 404);
      }

      await this.userTokensRepository.deleteById(userToken.id);

      const newRefreshToken = sign({ admin }, refresh_token_secret, {
        subject: sub,
        expiresIn: refresh_token_expires_in,
      });

      const now = new Date();
      const expires_date = this.dateProvider.addDays(
        now,
        refresh_token_expire_days,
      );
      expires_date.setUTCDate(this.dateProvider.getDay(now));

      await this.userTokensRepository.create({
        user_id,
        refresh_token: newRefreshToken,
        expires_date,
      });

      const newToken = sign({ admin }, token_secret, {
        subject: user_id,
        expiresIn: token_expires_in,
      });

      return {
        token: newToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new AppError('Refresh Token inválido!', 401);
    }
  }
}

export default RefreshTokenService;
