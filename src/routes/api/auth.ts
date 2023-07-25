import express from 'express';

import { authController } from '../../controllers/auth';

import { authRateLimiter } from '../../middlewares/rateLimiter';

const authRouter = express.Router();

/**
 * @openapi
 * '/api/register':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *      201:
 *        description: Created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: That username already exists
 *      500:
 *        description: Internal server error
 */
authRouter.post('/register', authRateLimiter, authController.register);

/**
 * @openapi
 * '/api/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Log in a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      400:
 *        description: Bad request
 *      404:
 *        description: User not found
 *      406:
 *        description: Not acceptable
 *      500:
 *        description: Internal server error
 */
authRouter.post('/login', authRateLimiter, authController.login);

/**
 * @openapi
 * '/api/refreshToken':
 *  get:
 *     tags:
 *     - User
 *     summary: Refresh user accessToken
 *     responses:
 *      200:
 *        description: accessToken has been created successfully
 *      400:
 *        description: Bad request
 *      401:
 *        description: No refreshToken in cookies
 *      403:
 *        description: refreshToken is invalid
 *      418:
 *        description: Impossible situation during normal use
 *      500:
 *        description: Internal server error
 */
authRouter.get('/refreshToken', authRateLimiter, authController.refreshToken);

/**
 * @openapi
 * '/api/logout':
 *  get:
 *     tags:
 *     - User
 *     summary: Log out user
 *     responses:
 *      200:
 *        description: User successfully logged out
 *      400:
 *        description: Bad request
 *      401:
 *        description: No refreshToken in cookies
 *      403:
 *        description: refreshToken is invalid
 *      418:
 *        description: Impossible situation during normal use
 *      500:
 *        description: Internal server error
 */
authRouter.get('/logout', authRateLimiter, authController.logout);

export { authRouter };
