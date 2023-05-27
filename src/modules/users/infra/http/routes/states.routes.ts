import { Router } from 'express';

import ListStatesController from '@modules/users/services/State/ListStates/ListStatesController';

const statesRouter = Router();

const listStatesController = new ListStatesController();

statesRouter.get('/', listStatesController.handle);

export default statesRouter;
