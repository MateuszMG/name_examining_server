import { Express } from 'express';
import PromClient from 'prom-client';

import { config } from '../config/config';

export const restResponseTimeHistogram = new PromClient.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

export const controllerResponseTimeHistogram = new PromClient.Histogram({
  name: 'controller_response_time_duration_seconds',
  help: 'Controller response time in seconds',
  labelNames: ['method', 'route', 'success'],
});

export const httpRequestCounter = new PromClient.Counter({
  name: 'http_request_count',
  help: 'Count of HTTP requests made to my app',
  labelNames: ['method', 'route', 'statusCode'],
});

export { PromClient };

export const metrics = (app: Express) => {
  PromClient.collectDefaultMetrics();

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', PromClient.register.contentType);
    res.send(await PromClient.register.metrics());
  });

  console.log(`Metrics available at http://localhost:${config.PORT}`);
};
