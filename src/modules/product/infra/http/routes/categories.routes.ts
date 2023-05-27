import ensureAuthenticated from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import CreateCategoryController from '@modules/product/services/Category/CreateCategory/CreateCategoryController';
import DeleteCategoryController from '@modules/product/services/Category/DeleteCategory/DeleteCategoryController';
import FindCategoryController from '@modules/product/services/Category/Find/FindCategoryController';
import UpdateCategoryController from '@modules/product/services/Category/UpdateCategory/UpdateCategoryController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const findCategoryController = new FindCategoryController();

categoryRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  createCategoryController.handle,
);

categoryRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateCategoryController.handle,
);

categoryRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteCategoryController.handle,
);

categoryRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow(''),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
    },
  }),
  findCategoryController.handle,
);

export default categoryRouter;
