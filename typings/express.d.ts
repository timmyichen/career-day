declare namespace Express {
  interface Request {
    user?: import('../server/models/Users').default;
  }
}
