import { inject, injectable } from 'tsyringe';

import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';
import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    name,
    description,
    type,
    user_id,
  }: ICreateRoleDTO): Promise<Role> {
    const checkRuleExists = await this.rolesRepository.findByName(name);

    if (checkRuleExists) {
      throw new AppError('Nome já cadastrado!');
    }

    const rules = await this.rolesRepository.create({
      name,
      description,
      type,
      user_id,
    });

    return rules;
  }
}

export default CreateRolesService;
