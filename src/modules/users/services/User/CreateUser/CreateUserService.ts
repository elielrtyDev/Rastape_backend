import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersRolesRepository from '@modules/users/repositories/IUsersRolesRepository';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest extends ICreateUserDTO {
  roles: string[];
  filename: string | undefined;
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('UsersRolesRepository')
    private usersRolesRepository: IUsersRolesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    email,
    phone,
    password,
    roles,
    filename,
    user_id,
  }: IRequest): Promise<User> {
    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError('E-mail já cadastrado!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const checkRuleExists = await Promise.all(
      roles.map(async role => {
        const checkRoleById = await this.rolesRepository.findById(role);

        if (checkRoleById === null) {
          throw new AppError(`A role ${role} não foi encontrada!`);
        }
        return checkRoleById;
      }),
    );

    const id = uuid();

    if (filename) {
      const fileName = await this.storageProvider.saveFile({
        id,
        name: 'avatar',
        file: filename,
        folder: 'avatars',
      });

      const user = await this.usersRepository.create({
        id,
        name,
        email,
        phone,
        password: hashedPassword,
        avatar: fileName,
        created_by: user_id,
      });

      checkRuleExists.map(async role => {
        await this.usersRolesRepository.create({
          role_id: role.id,
          user_id: user.id,
          createBy: user_id,
        });
      });

      return user;
    }

    const user = await this.usersRepository.create({
      id,
      name,
      email,
      phone,
      password: hashedPassword,
      avatar: null,
      created_by: user_id,
    });

    checkRuleExists.map(async role => {
      await this.usersRolesRepository.create({
        role_id: role.id,
        user_id: user.id,
        createBy: user_id,
      });
    });

    return user;
  }
}

export default CreateUserService;
