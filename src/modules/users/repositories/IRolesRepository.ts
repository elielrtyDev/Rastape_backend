import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

import ICreateRuleDTO from '../dtos/ICreateRoleDTO';
import Role from '../infra/typeorm/entities/Role';

interface IRolesRepository {
  create(data: ICreateRuleDTO): Promise<Role>;
  update(role: Role): Promise<Role>;
  findById(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  findByType(type: string): Promise<Role | undefined>;
  find(filters: IFiltersDTO): Promise<IPaginatedResponseDTO<Role>>;
  delete(id: string): Promise<void>;
}

export default IRolesRepository;
