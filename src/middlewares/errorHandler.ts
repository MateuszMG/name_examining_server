import { NextFunction, Request, Response } from 'express';
import { isHttpError } from 'http-errors';

import { errorMessages } from '../utils/errors/errorMessages';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorMessage = error.message || errorMessages.somethingWentWrong;
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  if (error.details?.length && error.details[0].message) {
    errorMessage = error.details[0].message;
  }

  res.status(statusCode).json({ message: errorMessage });
};
