import { getRepository, Repository } from 'typeorm';

import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create(data);

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ refresh_token });

    return userToken;
  }

  public async findByUserIdAndFCMToken(user_id: string): Promise<UserToken[]> {
    const userTokens = await this.ormRepository.find({
      user_id,
      fcm_token: true,
    });

    return userTokens;
  }
}

export default UserTokensRepository;
