// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express';
import { DocumentNode } from 'graphql';
import request from 'supertest';
import { print } from 'graphql/language/printer';
import { createApp } from '../app';
import { getConnection } from '../lib/db';
import Users from '../models/Users';

class TestApp {
  app: express.Application | undefined;
  loggedInUser: Users | undefined;

  async init() {
    this.app = await createApp({
      customMiddlewares: [
        (req, res, next) => {
          req.user = this.loggedInUser;
          next();
        },
      ],
    });
  }

  login(user: Users) {
    this.loggedInUser = user;
  }

  logout() {
    this.loggedInUser = undefined;
  }

  async cleanup() {
    getConnection().close();
  }

  validateAppExists() {
    if (!this.app) {
      throw new Error('`app` does not exist - did you call `init()`?');
    }
  }

  makeReq() {
    this.validateAppExists();
    return request(this.app);
  }

  makeGqlReq({
    query,
    variables = {},
    operationName,
  }: {
    query: DocumentNode;
    variables?: { [s: string]: any };
    operationName: string;
  }) {
    return (
      request(this.app)
        .post('/graphql')
        .set('content-Type', 'application/json')
        .set('Accept', 'application/json')
        // 'print'ing the query returns the original string
        .send({ query: print(query), variables, operationName })
    );
  }
}

export default TestApp;
