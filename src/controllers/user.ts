import { NextFunction, Response } from 'express';

import { AppRequest } from '../utils/types';

export const userController = {
  getSearchedNames: async (
    req: AppRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },

  addSearchedName: async (
    req: AppRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
};
