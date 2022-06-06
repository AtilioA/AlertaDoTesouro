import CreateServer from './app';

it('Installs all the middleware', () => {
  const app = CreateServer();
  expect(app.listen).toBeDefined();
  expect(app.use).toHaveLength(4);
});
