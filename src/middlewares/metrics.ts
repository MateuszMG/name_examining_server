import { NextFunction, Request, Response } from 'express';
import responseTime from 'response-time';

import {
  httpRequestCounter,
  restResponseTimeHistogram,
} from '../utils/metrics';

export const httpRequestCounterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  httpRequestCounter
    .labels({
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
    })
    .inc();
  next();
};

export const restResponseTimeHistogramHandler = responseTime(
  (req: Request, res: Response, time: number) => {
    if (req?.originalUrl) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.originalUrl,
          status_code: res.statusCode,
        },
        time / 1000,
      );
    }
  },
);
