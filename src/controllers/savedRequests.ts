import { NextFunction, Response } from 'express';

import { SavedRequestInput, SavedRequestModel } from '../models/savedRequest';

import { AppRequest } from '../utils/types';
import {
  getSavedRequestsSchema,
  saveRequestSchema,
} from '../utils/validations/savedRequests';

export const savedRequestsController = {
  getSavedRequests: async (
    req: AppRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user!._id;

      const { limit, page } = await getSavedRequestsSchema.validate(req.query);

      const documentsCount = await SavedRequestModel.countDocuments({ userId });

      const savedRequests = await SavedRequestModel.find({ userId })
        .sort({ updatedAt: 'asc' })
        .limit(limit)
        .skip(page * limit);

      res.json({
        savedRequests,
        pagination: {
          limit,
          page,
          total: documentsCount,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  saveRequest: async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!._id;

      const { genderized, name, nationalized } =
        await saveRequestSchema.validate(req.body);

      const existedRequest = await SavedRequestModel.findOne({ userId, name });

      let savedRequest;

      if (existedRequest) {
        savedRequest = await SavedRequestModel.findByIdAndUpdate(
          existedRequest._id,
          { savingTimes: [...existedRequest.savingTimes, Date.now()] },
          { new: true },
        );
      } else {
        savedRequest = await new SavedRequestModel<SavedRequestInput>({
          genderized,
          name,
          nationalized,
          savingTimes: [Date.now()],
          userId,
        }).save();
      }

      return res.status(201);
    } catch (error) {
      next(error);
    }
  },
};
