import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { config } from './config/config';

import { errorHandler } from './middlewares/errorHandler';
import { appRateLimiter } from './middlewares/rateLimiter';

import { authRouter } from './routes/api/auth';
import { userRouter } from './routes/api/user';

import { logger } from './utils/logger';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.WEBSITE_URLS, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(appRateLimiter);
app.use(errorHandler);
app.use(logger);

app.use('/api', authRouter);
app.use('/api', userRouter);

export { app };
