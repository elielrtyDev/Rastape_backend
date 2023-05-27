import '@modules/users/providers';
import './providers';

import CategoryRepository from '@modules/product/infra/typeorm/repositories/CategoryRepository';
import SubCategoryRepository from '@modules/product/infra/typeorm/repositories/SubCategoryRepository';
import ICategoryRepository from '@modules/product/repositories/ICategoryRepository';
import ISubCategoryRepository from '@modules/product/repositories/ISubCategoryRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersRolesRepository from '@modules/users/infra/typeorm/repositories/UsersRolesRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersRolesRepository from '@modules/users/repositories/IUsersRolesRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IUsersRolesRepository>(
  'UsersRolesRepository',
  UsersRolesRepository,
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISubCategoryRepository>(
  'SubCategoryRepository',
  SubCategoryRepository,
);
