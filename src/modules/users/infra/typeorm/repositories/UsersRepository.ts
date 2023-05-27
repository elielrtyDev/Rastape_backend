import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';
import filterAndPaginate from '@shared/utils/filterAndPaginate';

import User from '../entities/User';

interface ICreateUser extends ICreateUserDTO {
  id: string;
  created_by: string;
}

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    email,
    name,
    password,
    phone,
    avatar,
    id,
    created_by,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      email,
      name,
      password,
      phone,
      avatar,
      id,
      created_by,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async find(
    filters: IFiltersDTO,
  ): Promise<IPaginatedResponseDTO<User>> {
    const query = this.ormRepository
      .createQueryBuilder('entity')
      .limit(Number(filters.limit))
      .skip(Number(filters.limit) * Number(filters.page))
      .orderBy('created_at');

    const result = await filterAndPaginate<User>(query, filters);

    return result;
  }
}

export default UsersRepository;
