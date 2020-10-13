import Users from '../models/Users';

export interface GraphqlContext {
  user: Users | undefined;
}
