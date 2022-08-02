import { getConnection } from 'typeorm';

import DB from '.';

beforeAll(() => {
  return DB.connect('test');
});

afterAll(() => {
  return DB.close('test');
});

beforeEach(() => {
  return DB.clear('test');
});

test('connects to the `TEST` database', () => {
  const connection = getConnection('test');
  expect(connection).toBeDefined();
  expect(connection.isConnected).toBeTruthy();
});
