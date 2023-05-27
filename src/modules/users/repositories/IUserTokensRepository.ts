import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import UserToken from '../infra/typeorm/entities/UserToken';

interface IUserTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken | undefined>;
  findByUserIdAndFCMToken(user_id: string): Promise<UserToken[]>;
}

export default IUserTokensRepository;
