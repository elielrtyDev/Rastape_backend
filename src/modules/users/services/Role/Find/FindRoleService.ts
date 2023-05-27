import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import { inject, injectable } from 'tsyringe';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

@injectable()
class FindRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    sort,
    page,
    limit,
    ...filters
  }: IFiltersDTO): Promise<IPaginatedResponseDTO<Role>> {
    const match = await this.rolesRepository.find({
      sort,
      page,
      limit,
      ...filters,
    });

    return match;
  }
}

export default FindRoleService;
