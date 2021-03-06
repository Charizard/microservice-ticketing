import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import validateRequests from '../middlewares/validate-requests';
import BadRequestError from '../errors/bad-request-error';
import User from '../models/user';
import Password from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage("Email must be valid"),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
validateRequests,
async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid username / password");
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);

  if (!passwordsMatch) {
    throw new BadRequestError("Invalid username / password");
  }
  
  // Generate JWT
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_SECRET!);

  // Store JWT on session
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(existingUser);
});

export { router as signinRouter };