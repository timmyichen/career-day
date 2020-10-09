import TestApp from './TestApp';

describe('app.ts', () => {
  let server: TestApp;

  beforeAll((done) => {
    server = new TestApp();
    server.init().then(done);
  });

  afterAll(() => {
    server.cleanup();
  });

  it('should start and receive requests', async () => {
    const res = await server.makeReq().get('/').expect(200);
    expect(res.text).toBe('yay');
  });
});
