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

import { logger } from './utils/logger';
import { metrics } from './utils/metrics';
import { swaggerDocs } from './utils/swagger';

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

app.use('/api', authRouter);
app.use('/api', savedRequestsRouter);

app.use(errorHandler);

metrics(app);
swaggerDocs(app);

export { app };
