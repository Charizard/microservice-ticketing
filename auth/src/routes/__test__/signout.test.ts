import request from 'supertest';
import app from '../../app';

it('returns a 200 on invalid session', async () => {
  const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});

it('returns a 200 on valid session', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});