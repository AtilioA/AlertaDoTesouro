import app from './app';

it('Installs all the middleware', () => {
  expect(app.listen).toBeDefined();
  // I don't even know what else to test
});
