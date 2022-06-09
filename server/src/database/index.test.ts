import { getConnection } from 'typeorm';

import DB from '.';

beforeAll(async () => {
  await DB.connect('test');
});

afterAll(async () => {
  await DB.close('test');
});

beforeEach(async () => {
  DB.clear('test');
});

test('connects to the database', () => {
  const connection = getConnection('test');
  expect(connection).toBeDefined();
  expect(connection.isConnected).toBeTruthy();
});
