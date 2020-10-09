import TestApp from './TestApp';

describe('app.ts', () => {
  it('should start and receive requests', async () => {
    const server = new TestApp();
    const res = await server.makeReq().get('/').expect(200);
    expect(res.text).toBe('yay');
  });
});
