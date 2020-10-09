import express from 'express';
import request from 'supertest';
import { createApp } from '../app';

class TestApp {
  app: express.Application;

  constructor() {
    this.app = createApp();
  }

  makeReq() {
    return request(this.app);
  }
}

export default TestApp;
