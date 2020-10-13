import { gql } from 'apollo-server-express';
import Users from '../../../models/Users';
import TestApp from '../../../test/TestApp';

const operationName = 'currentUser';
const currentUserQuery = gql`
  query ${operationName} {
    currentUser {
      id
      name
    }
  }
`;

describe('currentUser query', () => {
  let server: TestApp;

  beforeAll((done) => {
    server = new TestApp();
    server.init().then(done);
  });

  afterAll(() => {
    server.cleanup();
  });

  it('should return null for an unauthed user', async () => {
    const res = await server.makeGqlReq({ query: currentUserQuery, operationName });
    expect(res.body.data.currentUser).toBe(null);
  });

  it('should return the user for a logged-in user', async () => {
    // TODO: make this an actual user in the database
    const user = new Users();
    user.id = 1;
    user.name = 'some name';
    user.email = 'email';
    user.password = 'security';

    server.login(user);
    const res = await server.makeGqlReq({ query: currentUserQuery, operationName });
    expect(res.body.data.currentUser).toEqual({ id: '1', name: 'some name' });
  });
});
