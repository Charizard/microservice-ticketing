import request from 'supertest';
import app from '../../app';

it('returns a 400 on invalid email', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(400);
});

it('returns a 400 on invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'sample@example.com',
      password: 'invalid'
    })
    .expect(400);
});

it('returns a 200 and sets a cookie on valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});