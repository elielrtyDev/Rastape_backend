import passwordRouter from '@modules/account/infra/http/routes/password.routes';
import sessionsRouter from '@modules/account/infra/http/routes/sessions.routes';
import categoriesRouter from '@modules/product/infra/http/routes/categories.routes';
import subcategoriesRouter from '@modules/product/infra/http/routes/subcategories.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import express from 'express';

const routes = express.Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/roles', rolesRouter);
routes.use('/categories', categoriesRouter);
routes.use('/subcategories', subcategoriesRouter);

export default routes;
