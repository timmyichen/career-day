import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import currentUserResolver from '../graphql/queries/currentUser';
import { GraphqlContext } from './types';

export async function applyGraphqlMiddleware(app: express.Express) {
  const schema = await buildSchema({ resolvers: [currentUserResolver] });
  const server = new ApolloServer({
    schema,
    context: ({ req }): GraphqlContext => ({ user: req.user }),
  });
  server.applyMiddleware({ app, path: '/graphql' });
}
