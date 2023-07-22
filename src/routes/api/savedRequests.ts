import express from 'express';

import { savedRequestsController } from '../../controllers/savedRequests';

import { verifyRoles } from '../../middlewares/verifyRoles';

import { UserRoles } from '../../models/user';

const savedRequestsRouter = express.Router();

savedRequestsRouter.get(
  '/savedRequests',
  verifyRoles([UserRoles.ADMIN]),
  savedRequestsController.getSavedRequests,
);

savedRequestsRouter.post(
  '/savedRequests',
  verifyRoles([UserRoles.ADMIN]),
  savedRequestsController.saveRequest,
);

export { savedRequestsRouter };
