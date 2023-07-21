import express from 'express';

import { authController } from '../../controllers/auth';

import { authRateLimiter } from '../../middlewares/rateLimiter';

const authRouter = express.Router();

authRouter.post('/register', authRateLimiter, authController.register);
authRouter.post('/login', authRateLimiter, authController.login);
authRouter.get('/refreshToken', authRateLimiter, authController.refreshToken);
authRouter.get('/logout', authRateLimiter, authController.logout);

export { authRouter };
