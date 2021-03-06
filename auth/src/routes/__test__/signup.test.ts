import request from 'supertest';
import app from '../../app';

it('returns a 201 on success and sets a cookie', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(201);
  
  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a error on invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@examplecom',
      password: 'sample123'
    })
    .expect(400);
});

it('returns a error on invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@example.com',
      password: 'ab'
    })
    .expect(400);
});

it('returns a error on empty body', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'sample123'
    })
    .expect(400);
    
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'sample@example.com'
  })
  .expect(400);
});


it('returns a error on already existing signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(201);
  
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sample@example.com',
      password: 'sample123'
    })
    .expect(400);
});