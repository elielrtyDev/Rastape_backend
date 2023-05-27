import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface ICreateUser extends ICreateUserDTO {
  id: string;
  created_by: string;
}

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
  find(filters: IFiltersDTO): Promise<IPaginatedResponseDTO<User>>;
}

export default IUsersRepository;
