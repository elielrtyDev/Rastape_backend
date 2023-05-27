import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import { getRepository, Repository } from 'typeorm';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';
import filterAndPaginate from '@shared/utils/filterAndPaginate';

import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async create({
    description,
    name,
    type,
    user_id,
  }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({
      description,
      name,
      type,
      created_by: user_id,
    });

    await this.ormRepository.save(role);

    return role;
  }

  public async update(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }

  public async findById(id: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ id });

    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ name });

    return role;
  }

  public async findByType(type: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ type });

    return role;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async find(
    filters: IFiltersDTO,
  ): Promise<IPaginatedResponseDTO<Role>> {
    const query = this.ormRepository
      .createQueryBuilder('entity')
      .limit(Number(filters.limit))
      .skip(Number(filters.limit) * Number(filters.page))
      .orderBy('created_at');

    const result = await filterAndPaginate<Role>(query, filters);

    return result;
  }
}

export default RolesRepository;
