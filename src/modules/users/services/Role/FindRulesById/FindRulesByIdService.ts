import { inject, injectable } from 'tsyringe';

import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class FindRulesByIdService {
  constructor(
    @inject('RolesRepository')
    private roleRepository: IRolesRepository,
  ) {}

  public async execute(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new AppError('Categoria não encontrado!', 404);
    }

    return role;
  }
}

export default FindRulesByIdService;
