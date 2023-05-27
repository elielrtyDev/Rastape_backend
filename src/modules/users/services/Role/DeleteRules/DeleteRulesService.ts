import { inject, injectable } from 'tsyringe';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
class DeleteRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    role.updated_by = user_id;
    role.updated_at = new Date();

    await this.rolesRepository.update(role);

    await this.rolesRepository.delete(id);
  }
}

export default DeleteRolesService;
