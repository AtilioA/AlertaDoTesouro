import request from 'supertest';
import CreateServer from '../app';

const app = CreateServer();

test('GET /', async () => {
  await request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      expect(res.body.message).toBe('🌐 AlertaDoTesouro is online.');
    });
});
