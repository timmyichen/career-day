// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { createApp } from './app';

async function init() {
  const app = await createApp({
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });
}

init();
