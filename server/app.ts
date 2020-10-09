import express from 'express';
import { connectMongo } from './lib/db';

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

  app.get('/', (req, res) => {
    res.send('yay');
  });

  return app;
}
