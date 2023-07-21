import { config } from './config/config';
import { mongooseConnection } from './config/db';

import { app } from './app';

app.listen({ port: config.PORT }, () => {
  mongooseConnection();
  console.log('Server running on port: ' + config.PORT);
});
