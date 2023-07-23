import PromClient from 'prom-client';

PromClient.collectDefaultMetrics();

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
