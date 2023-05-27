import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import RefreshTokenController from '@modules/account/services/RefreshToken/createRefreshToken/RefreshTokenController';
import AuthenticateUserController from '@modules/account/services/Session/AuthenticateUser/AuthenticateUserController';

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle,
);

sessionsRouter.post(
  '/refresh-token',
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().required(),
    },
  }),
  refreshTokenController.handle,
);

export default sessionsRouter;
