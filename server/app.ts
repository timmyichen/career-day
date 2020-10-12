import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import { connectDb } from './lib/db';
import { applyGraphqlMiddleware } from './lib/apolloServer';

export async function createApp({ customMiddlewares }: { customMiddlewares?: Array<RequestHandler> }) {
  const app = express();

  await connectDb();

  // middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  if (customMiddlewares) {
    customMiddlewares.forEach((middleware) => app.use(middleware));
  }

  applyGraphqlMiddleware(app);

  app.get('/', (req, res) => {
    res.send('yay');
  });

  return app;
}
