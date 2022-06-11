import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  // middleware: express-validator for validation
  [
    body('email')
      // make sure email is valid
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      // make sure theres no leading or trailing spaces in password
      .trim()
      // and is in certain length
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // error: user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // generate JWT
    const userJWT = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    // store on session object
    req.session = {
      jwt: userJWT
    };

    res.status(201).send(user);
  });

export { router as signupRouter };