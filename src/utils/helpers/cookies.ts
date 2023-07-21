import { Request } from 'express';

export const getRefreshTokenCookie = (req: Request) =>
  req.headers.cookie
    ?.split(';')
    .find((cookie) => cookie.includes('refreshToken'))
    ?.split('=')[1];
