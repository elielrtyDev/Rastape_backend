import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import CreateUserController from '@modules/users/services/User/CreateUser/CreateUserController';
import DeleteUserController from '@modules/users/services/User/DeleteUser/DeleteUserController';
import FindUserController from '@modules/users/services/User/Find/FindUserController';
import FindUserByIdController from '@modules/users/services/User/FindUserById/FindUserByIdController';
import UpdateUserAvatarController from '@modules/users/services/User/UpdateUserAvatar/UpdateUserAvatarController';
import UpdateUserPasswordController from '@modules/users/services/User/UpdateUserPassword.ts/UpdateUserPasswordController';
import UpdateUserPersonalDataController from '@modules/users/services/User/UpdateUserPersonalData/UpdateUserPersonalDataController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const createUserController = new CreateUserController();
const findUserByIdController = new FindUserByIdController();
const updateUserPersonalDataController = new UpdateUserPersonalDataController();
const updateUserPasswordController = new UpdateUserPasswordController();
const updateUserAvatarController = new UpdateUserAvatarController();
const deleteUserController = new DeleteUserController();

const findUserController = new FindUserController();

usersRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('avatar'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string(),
      password: Joi.string().required(),
      avatar: Joi.string(),
      roles: Joi.array().items(Joi.string().uuid()).required(),
    }),
  }),
  createUserController.handle,
);

usersRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  findUserByIdController.handle,
);

usersRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      phone: Joi.string(),
      email: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateUserPersonalDataController.handle,
);

usersRouter.patch(
  '/password',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  updateUserPasswordController.handle,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteUserController.handle,
);

usersRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow(''),
      phone: Joi.string().allow(''),
      email: Joi.string().allow(''),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
    },
  }),
  findUserController.handle,
);

export default usersRouter;
