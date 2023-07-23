import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { config } from './config/config';

import { errorHandler } from './middlewares/errorHandler';
import {
  httpRequestCounterHandler,
  restResponseTimeHistogramHandler,
} from './middlewares/metrics';
import { appRateLimiter } from './middlewares/rateLimiter';

import { authRouter } from './routes/api/auth';
import { savedRequestsRouter } from './routes/api/savedRequests';
import { metricsRouter } from './routes/web/metrics';

import { logger } from './utils/logger';

const app = express();

app.use('/', (req, res, next) => {
  console.log('-');
  next();
});

app.use(helmet());
app.use(cors({ origin: config.WEBSITE_URLS, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(appRateLimiter);
app.use(logger);

app.use(httpRequestCounterHandler);
app.use(restResponseTimeHistogramHandler);

app.use('/', metricsRouter);
app.use('/api', authRouter);
app.use('/api', savedRequestsRouter);

app.use(errorHandler);

export { app };
