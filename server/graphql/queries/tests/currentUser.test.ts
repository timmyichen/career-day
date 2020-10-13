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
    const user = Users.create({
      id: 1,
      name: 'some name',
      email: 'x@y.com',
      password: 'secure',
    });
    await user.save();

    server.login(user);
    const res = await server.makeGqlReq({ query: currentUserQuery, operationName });
    expect(res.body.data.currentUser).toEqual({ id: '1', name: 'some name' });
  });
});
