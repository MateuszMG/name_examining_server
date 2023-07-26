import expressRateLimit from 'express-rate-limit';

const tenMinutes = 1000 * 60 * 10;

const appRateLimiter = expressRateLimit({
  windowMs: tenMinutes,
  max: 100,
});

const authRateLimiter = expressRateLimit({
  windowMs: tenMinutes,
  max: 10,
});

export { appRateLimiter, authRateLimiter };
