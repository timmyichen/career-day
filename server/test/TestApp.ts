// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express';
import request from 'supertest';
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
}

export default TestApp;
