import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from '../app';
import request from 'supertest';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>
    }
  }
}

global.signin = async () => {
  const email = 'sample@example.com';
  const password = 'sample123';

  const signupRes = await request(app)
    .post('/api/users/signup')
    .send({
      email: email,
      password: password
    })
    .expect(201);
  

  return signupRes.get('Set-Cookie');
};

let mongo: any;

beforeAll(async () => {
  process.env.JWT_SECRET = 'sample';
  
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    console.error(err);
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for(let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});