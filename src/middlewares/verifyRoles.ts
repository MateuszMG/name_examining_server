import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';

import { User, UserModel, UserRoles } from '../models/user';

import { errorMessages } from '../utils/errors/errorMessages';
import { getRefreshTokenCookie } from '../utils/helpers/cookies';
import { decodeAccessToken, decodeRefreshToken } from '../utils/helpers/jwt';
import { AppRequest, omitedUserValues } from '../utils/types';

export const verifyRoles =
  (allowedRoles: UserRoles[]) =>
  async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const acessToken = req.headers['authorization']?.split(' ')[1];
      const refreshToken = getRefreshTokenCookie(req);

      decodeRefreshToken(refreshToken);
      const decodedUser = decodeAccessToken(acessToken);

      const user = (await UserModel.findById(decodedUser._id).select(
        omitedUserValues,
      )) as unknown as User | null;

      if (!user || user.refreshToken !== refreshToken)
        throw createHttpError(418, errorMessages.IAmATeapot);

      const includeRole = user.roles.some((role) =>
        allowedRoles.includes(role),
      );

      if (!includeRole)
        throw createHttpError(403, errorMessages.accessDeniedMessage);

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
