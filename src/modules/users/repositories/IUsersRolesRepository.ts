// import IFiltersDTO from '@shared/dtos/IFiltersDTO';
// import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

import ICreateUserRoleDTO from '../dtos/ICreateUserRoleDTO';
import UserRole from '../infra/typeorm/entities/UserRole';

interface IUsersRolesRepository {
  create(data: ICreateUserRoleDTO): Promise<UserRole>;
  update(userRole: UserRole): Promise<UserRole>;
  findById(id: string): Promise<UserRole | undefined>;
  findByUserId(user_id: string): Promise<UserRole[]>;
  delete(id: string): Promise<void>;
  // find(filters: IFiltersDTO): Promise<IPaginatedResponseDTO<UserRole>>;
}

export default IUsersRolesRepository;
