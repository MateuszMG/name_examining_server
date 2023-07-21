import { InferSchemaType, model, Schema } from 'mongoose';

export enum UserRoles {
  ADMIN = 'ADMIN',
}

export interface UserInput {
  username: string;
  password: string;
  refreshToken: string;
  roles: UserRoles[];
}

export interface User extends UserInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema<UserInput>(
  {
    username: {
      maxlength: 40,
      minlength: 3,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },

    password: {
      maxlength: 72,
      minlength: 6,
      required: true,
      trim: true,
      type: String,
    },

    refreshToken: String,

    roles: {
      type: [
        {
          type: String,
          enum: Object.keys(UserRoles) as UserRoles[],
        },
      ],
      default: [UserRoles.ADMIN],
    },
  },
  { timestamps: true },
);

export const UserModel = model('user', userSchema);
