import createHttpError from 'http-errors';
import * as jwt from 'jsonwebtoken';

import { config } from '../../config/config';

import { UserRoles } from '../../models/user';

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = config;

export interface JWTData {
  _id: string;
  roles: UserRoles[];
}

export interface DecodedJWT extends JWTData {
  exp: number;
  iat: number;
}

export const createAccessToken = (payload: JWTData) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '60m' });
};

export const createRefreshToken = (payload: JWTData) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1y' });
};

export const decodeAccessToken = (token?: string) => {
  if (!token) throw createHttpError(401);

  let user;

  try {
    user = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY) as DecodedJWT;
  } catch (error) {
    throw createHttpError(403);
  }

  return user;
};

export const decodeRefreshToken = (token?: string) => {
  if (!token) throw createHttpError(401);

  let user;

  try {
    user = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY) as DecodedJWT;
  } catch (error) {
    throw createHttpError(403);
  }

  return user;
};
