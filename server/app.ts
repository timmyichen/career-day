import express from 'express';
import bodyParser from 'body-parser';
import { connectMongo } from './lib/db';
import { applyGraphqlMiddleware } from './lib/apolloServer';

interface Options {
  mongoUri: string | undefined;
  dbName: string | undefined;
}

export async function createApp({ mongoUri, dbName }: Options) {
  if (!mongoUri || !dbName) {
    throw new Error('missing mongoUri/dbName env vars');
  }

  const app = express();

  await connectMongo({ mongoUri, dbName });
  console.log('\nconnected to database\n');

  // middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  applyGraphqlMiddleware(app);

  app.get('/', (req, res) => {
    res.send('yay');
  });

  return app;
}
