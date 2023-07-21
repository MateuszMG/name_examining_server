import express from 'express';

import { userController } from '../../controllers/user';

import { verifyRoles } from '../../middlewares/verifyRoles';

import { UserRoles } from '../../models/user';

const userRouter = express.Router();

userRouter.get(
  '/searchedNames',
  verifyRoles([UserRoles.ADMIN]),
  userController.getSearchedNames,
);

userRouter.post(
  '/searchedNames',
  verifyRoles([UserRoles.ADMIN]),
  userController.addSearchedName,
);

export { userRouter };
