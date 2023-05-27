import ICreateUserRoleDTO from '@modules/users/dtos/ICreateUserRoleDTO';
import IUsersRolesRepository from '@modules/users/repositories/IUsersRolesRepository';
import { getRepository, Repository } from 'typeorm';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';
import filterAndPaginate from '@shared/utils/filterAndPaginate';

import UserRole from '../entities/UserRole';

class UsersRolesRepository implements IUsersRolesRepository {
  private ormRepository: Repository<UserRole>;

  constructor() {
    this.ormRepository = getRepository(UserRole);
  }

  public async create({
    role_id,
    user_id,
    createBy,
  }: ICreateUserRoleDTO): Promise<UserRole> {
    const userRole = this.ormRepository.create({
      role_id,
      user_id,
      created_by: createBy,
    });

    await this.ormRepository.save(userRole);

    return userRole;
  }

  public async update(userRole: UserRole): Promise<UserRole> {
    return this.ormRepository.save(userRole);
  }

  public async findById(id: string): Promise<UserRole | undefined> {
    const userRole = await this.ormRepository.findOne({ where: { id } });

    return userRole;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async findByUserId(user_id: string): Promise<UserRole[]> {
    const result = await this.ormRepository.find({ user_id });

    return result;
  }

  public async find(
    filters: IFiltersDTO,
  ): Promise<IPaginatedResponseDTO<UserRole>> {
    const query = this.ormRepository
      .createQueryBuilder('entity')
      .limit(Number(filters.limit))
      .skip(Number(filters.limit) * Number(filters.page))
      .orderBy('created_at');

    const result = await filterAndPaginate<UserRole>(query, filters);

    return result;
  }
}

export default UsersRolesRepository;
