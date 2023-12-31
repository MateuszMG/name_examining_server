import { NextFunction, Response } from 'express';

import { SavedRequestInput, SavedRequestModel } from '../models/savedRequest';

import { controllerResponseTimeHistogram } from '../utils/metrics';
import {
  getSavedRequestsSchema,
  saveRequestSchema,
} from '../utils/schemas/savedRequests';
import { AppRequest } from '../utils/types';

export const savedRequestsController = {
  getSavedRequests: async (
    req: AppRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const userId = req.user!._id;

      const { limit, page } = await getSavedRequestsSchema.validate(req.query);

      const documentsCount = await SavedRequestModel.countDocuments({ userId });

      const savedRequests = await SavedRequestModel.find({ userId })
        .sort({ updatedAt: 'asc' })
        .limit(limit)
        .skip(page * limit)
        .select(['-__v', '-userId']);

      res.json({
        savedRequests,
        pagination: {
          limit,
          page,
          total: documentsCount,
        },
      });

      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },

  saveRequest: async (req: AppRequest, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const userId = req.user!._id;

      const { genderized, name, nationalized } =
        await saveRequestSchema.validate(req.body);

      const existedRequest = await SavedRequestModel.findOne({ userId, name });

      if (existedRequest) {
        await SavedRequestModel.findByIdAndUpdate(
          existedRequest._id,
          { savingTimes: [...existedRequest.savingTimes, Date.now()] },
          { new: true },
        );
      } else {
        await new SavedRequestModel<SavedRequestInput>({
          genderized,
          name,
          nationalized,
          savingTimes: [Date.now()],
          userId,
        }).save();
      }

      res.sendStatus(201);

      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },
};
