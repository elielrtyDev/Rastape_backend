import { inject, injectable } from 'tsyringe';

import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  role_id: string;
  name: string;
  description: string;
  type: string;
  user_id: string;
}

@injectable()
class UpdateRulesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    role_id,
    name,
    description,
    type,
    user_id,
  }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new AppError('Role não encontrada!', 404);
    }

    const checkRoleExists = await this.rolesRepository.findByName(name);

    if (checkRoleExists) {
      throw new AppError('Nome já cadastrado!');
    }

    role.name = name || role.name;

    role.description = description || role.description;
    role.type = type || role.type;

    role.updated_by = user_id;
    role.updated_at = new Date();

    await this.rolesRepository.update(role);

    return role;
  }
}

export default UpdateRulesService;
