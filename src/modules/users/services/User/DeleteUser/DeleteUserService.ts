import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    user.deleted_by = user_id;

    await this.usersRepository.update(user);
    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
