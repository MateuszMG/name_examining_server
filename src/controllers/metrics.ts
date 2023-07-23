import { NextFunction, Request, Response } from 'express';

import { PromClient } from '../utils/metrics';

export const metricsController = {
  getMetrics: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.set('Content-Type', PromClient.register.contentType);
      res.send(await PromClient.register.metrics());
    } catch (error) {
      next(error);
    }
  },
};
