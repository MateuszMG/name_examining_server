import express from 'express';

import { metricsController } from '../../controllers/metrics';

const metricsRouter = express.Router();

metricsRouter.get('/metrics', metricsController.getMetrics);

export { metricsRouter };
