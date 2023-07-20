import { config } from './config/config';
import { mongooseConnect } from './config/db';

import { app } from './app';

app.listen({ port: config.PORT }, () => {
  mongooseConnect();
  console.log('Port: ' + config.PORT);
});
