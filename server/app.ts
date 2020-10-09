import express from 'express';

const createApp = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('yay');
  });

  return app;
};

export { createApp };
