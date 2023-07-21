import { Request } from 'express';

import { User } from '../models/user';

export const omitedUserValues = ['-password', '-__v'];

export interface AppRequest extends Request {
  user?: Omit<User, 'password' | '__v'>;
}
