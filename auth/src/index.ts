
import mongoose from 'mongoose';
import app from './app';

const start = async () => {
  if(!process.env.JWT_SECRET) {
    throw new Error('Environment variable JWT_SECRET not defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-svc:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    console.error(err);
  }

  console.log('Connected to mongoDB');
  
  app.listen(3000, () => {
    console.log('Listening to port 3000!!!!!');
  });
}

start();