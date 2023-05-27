import ResetPasswordController from '@modules/users/services/User/ResetPassword/ResetPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const passwordRouter = Router();

const resetPasswordController = new ResetPasswordController();

// passwordRouter.post(
//   '/forgot',
//   celebrate({
//     [Segments.BODY]: {
//       email: Joi.string().required(),
//     },
//   }),
//   sendForgotPasswordMailController.handle,
// );

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
    },
    [Segments.QUERY]: {
      token: Joi.string().required(),
    },
  }),
  resetPasswordController.handle,
);

export default passwordRouter;
