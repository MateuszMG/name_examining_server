import { model, Schema } from 'mongoose';

interface Country {
  country_id: string;
  probability: number;
}

export interface Nationalized {
  count: number;
  country: Country[];
  name: string;
}

export interface Genderized {
  count: number;
  gender: string;
  name: string;
  probability: number;
}

export interface SavedRequestInput {
  genderized: Genderized;
  name: string;
  nationalized: Nationalized;
  savingTimes: number[];
  userId: string;
}

export interface SavedRequest extends SavedRequestInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const nameValidation = {
  maxlength: 100,
  required: true,
  trim: true,
  type: String,
};

const countryIdValidation = {
  maxlength: 3,
  required: true,
  trim: true,
  type: String,
};

const genderValidation = {
  maxlength: 6,
  required: true,
  trim: true,
  type: String,
};

const countValidation = {
  max: 1_000_000,
  min: 0,
  required: true,
  type: Number,
};

const probabilityValidation = {
  max: 1,
  min: 0,
  required: true,
  type: Number,
};

const savedRequestSchema = new Schema<SavedRequestInput>(
  {
    userId: Schema.Types.ObjectId,
    name: nameValidation,

    genderized: {
      count: countValidation,
      gender: genderValidation,
      name: nameValidation,
      probability: probabilityValidation,
    },

    nationalized: {
      count: countValidation,
      country: [
        {
          country_id: countryIdValidation,
          probability: probabilityValidation,
        },
      ],
      name: nameValidation,
    },

    savingTimes: [{ type: Number }],
  },
  { timestamps: true },
);

export const SavedRequestModel = model('savedRequest', savedRequestSchema);
