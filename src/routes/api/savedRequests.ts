import express from 'express';

import { savedRequestsController } from '../../controllers/savedRequests';

import { verifyRoles } from '../../middlewares/verifyRoles';

import { UserRoles } from '../../models/user';

const savedRequestsRouter = express.Router();

/**
 * @openapi
 * '/api/savedRequests/?limit={limit}&page={page}':
 *  get:
 *     tags:
 *     - Saved requests
 *     summary: Get saved requests
 *     parameters:
 *      - name: limit
 *        in: path
 *        default: 10
 *      - name: page
 *        in: path
 *        default: 0
 *     responses:
 *      201:
 *        description: The request has been saved
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/GetSavedRequestsResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Lack of refreshToken and/or accessToken
 *      403:
 *        description: refreshToken and/or accessToken is invalid
 *      500:
 *        description: Internal server error
 */
savedRequestsRouter.get(
  '/savedRequests',
  verifyRoles([UserRoles.ADMIN]),
  savedRequestsController.getSavedRequests,
);

/**
 * @openapi
 * '/api/savedRequests':
 *  post:
 *     tags:
 *     - Saved requests
 *     summary: Save request
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/SaveRequestInput'
 *     responses:
 *      201:
 *        description: The request has been saved
 *      400:
 *        description: Bad request
 *      401:
 *        description: Lack of refreshToken and/or accessToken
 *      403:
 *        description: refreshToken and/or accessToken is invalid
 *      500:
 *        description: Internal server error
 */
savedRequestsRouter.post(
  '/savedRequests',
  verifyRoles([UserRoles.ADMIN]),
  savedRequestsController.saveRequest,
);

export { savedRequestsRouter };
