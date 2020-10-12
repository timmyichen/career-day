declare namespace Express {
  interface Request {
    user?: import('../server/models/User').default;
  }
}
