import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  file: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Apenas usuários logados podem mudar o avatar!', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, 'avatars');
    }

    const fileName = await this.storageProvider.saveFile({
      id: user_id,
      name: 'avatar',
      file,
      folder: 'avatars',
    });

    user.avatar = fileName;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
