import ensureAuthenticated from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import CreateRulesController from '@modules/users/services/Role/CreateRules/CreateRolesController';
import DeleteRulesController from '@modules/users/services/Role/DeleteRules/DeleteRulesController';
import FindRoleController from '@modules/users/services/Role/Find/FindRoleController';
import UpdateRulesController from '@modules/users/services/Role/UpdateRules/UpdateRulesController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const rolesRouter = Router();

const createRulesController = new CreateRulesController();
const updateRulesController = new UpdateRulesController();
const deleteRulesController = new DeleteRulesController();
const findRoleController = new FindRoleController();

rolesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      type: Joi.string().required().valid('admin', 'common'),
    },
  }),
  createRulesController.handle,
);

rolesRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      type: Joi.string().valid('admin', 'common'),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateRulesController.handle,
);

rolesRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteRulesController.handle,
);

rolesRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow(''),
      description: Joi.string().allow(''),
      type: Joi.string().allow(''),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
    },
  }),
  findRoleController.handle,
);

export default rolesRouter;
