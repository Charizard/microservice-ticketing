import request from 'supertest';
import app from '../../app';

it('returns a 401 on invalid session', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', 'jibberish')
    .send()
    .expect(401);
  
  expect(response.body.currentUser).toBeUndefined();
  expect(response.body).toEqual({"errors": [{"message": "Unauthorized"}]});
});

it('returns a 200 and user details on valid session', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('sample@example.com');
});
