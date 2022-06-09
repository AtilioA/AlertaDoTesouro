import request from 'supertest';
import app from '../app';

describe('/', () => {
  test('GET /', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.headers).toHaveProperty(
      'content-type',
      'application/json; charset=utf-8',
    );
    expect(res.body).toMatchObject({
      message: '🌐 AlertaDoTesouro is online.',
    });
  });
});
