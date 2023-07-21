import mongoose from 'mongoose';

import { config } from './config';

export const mongooseConnection = async () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(config.DATABASE_URL).then(
    () => console.log('Mongoose connected'),
    (error) => console.log('Mongoose error', error),
  );
};
