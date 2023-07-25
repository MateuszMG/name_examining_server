import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import { UserInput, UserModel, UserRoles } from '../models/user';

import { errorMessages } from '../utils/errors/errorMessages';
import { getRefreshTokenCookie } from '../utils/helpers/cookies';
import {
  createAccessToken,
  createRefreshToken,
  decodeRefreshToken,
  JWTData,
} from '../utils/helpers/jwt';
import { loginSchema, registerSchema } from '../utils/schemas/auth';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, username } = await registerSchema.validate(req.body);

      const user = await UserModel.findOne({ username });
      if (user) throw createHttpError(409, errorMessages.usernameTaken);

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await new UserModel<UserInput>({
        password: passwordHash,
        refreshToken: '',
        roles: [UserRoles.ADMIN],
        username,
      }).save();

      const jwtData: JWTData = {
        _id: newUser._id.toString(),
        roles: newUser.roles,
      };

      const refreshToken = createRefreshToken(jwtData);
      const accessToken = createAccessToken(jwtData);

      await UserModel.findByIdAndUpdate(newUser._id, { refreshToken });

      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 60 * 24 * 30,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      res.status(201).json({ accessToken });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, username } = await loginSchema.validate(req.body);

      const user = await UserModel.findOne({ username });
      if (!user)
        throw createHttpError(406, {
          message: errorMessages.usernameOrPassword,
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw createHttpError(406, {
          message: errorMessages.usernameOrPassword,
        });

      const jwtData: JWTData = {
        _id: user._id.toString(),
        roles: user.roles,
      };

      const refreshToken = createRefreshToken(jwtData);
      const accessToken = createAccessToken(jwtData);

      await UserModel.findByIdAndUpdate(user._id, { refreshToken });

      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 60 * 24 * 30,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = getRefreshTokenCookie(req);

      const user = decodeRefreshToken(refreshToken);

      const refreshTokenExists = !!(await UserModel.findOne({ refreshToken }));
      if (!refreshTokenExists)
        throw createHttpError(418, errorMessages.IAmATeapot);

      const accessToken = createAccessToken({
        _id: user._id,
        roles: user.roles,
      });

      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = getRefreshTokenCookie(req);

      res.clearCookie('refreshToken', { httpOnly: true });

      const user = decodeRefreshToken(refreshToken);

      const refreshTokenExists = !!(await UserModel.findOne({ refreshToken }));
      if (!refreshTokenExists)
        throw createHttpError(418, errorMessages.IAmATeapot);

      await UserModel.findByIdAndUpdate(user._id, { refreshToken: '' });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
};
