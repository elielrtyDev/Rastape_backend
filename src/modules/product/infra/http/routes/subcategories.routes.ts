import ensureAuthenticated from '@modules/account/infra/http/middlewares/ensureAuthenticated';
import CreateSubCategoryController from '@modules/product/services/SubCategory/CreateSubCategory/CreateSubCategoryController';
import DeleteSubCategoryController from '@modules/product/services/SubCategory/DeleteSubCategory/DeleteSubCategoryController';
import FindSubCategoryController from '@modules/product/services/SubCategory/Find/FindSubCategoryController';
import UpdateSubCategoryController from '@modules/product/services/SubCategory/UpdateSubCategory/UpdateSubCategoryController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const subcategoryRouter = Router();

const createSubCategoryController = new CreateSubCategoryController();
const deleteSubCategoryController = new DeleteSubCategoryController();
const updateSubCategoryController = new UpdateSubCategoryController();
const findSubCategoryController = new FindSubCategoryController();

subcategoryRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      category_id: Joi.string().uuid().required(),
    },
  }),
  createSubCategoryController.handle,
);

subcategoryRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      category_id: Joi.string().uuid().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateSubCategoryController.handle,
);

subcategoryRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteSubCategoryController.handle,
);

subcategoryRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().allow(''),
      category: Joi.string().allow(''),
      category_id: Joi.string().allow(''),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
    },
  }),
  findSubCategoryController.handle,
);

export default subcategoryRouter;
