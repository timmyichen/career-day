import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from '../graphql';

export function applyGraphqlMiddleware(app: express.Express) {
  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app, path: '/graphql' });
}
