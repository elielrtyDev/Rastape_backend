import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFiltersDTO  from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO  from '@shared/dtos/IPaginatedResponseDTO';

@injectable()
class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    sort,
    page,
    limit,
    ...filters
  }: IFiltersDTO): Promise<IPaginatedResponseDTO<User>> {
    const match = await this.usersRepository.find({
      sort,
      page,
      limit,
      ...filters,
    });

    return match;
  }
}

export default FindUserService;
