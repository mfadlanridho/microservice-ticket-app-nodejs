import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup', 
  // validation
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim() // make sure theres no leading or trailing spaces in password
      .isLength({min:4, max: 20})
      .withMessage('Password must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new RequestValidationError(validationErrors.array());
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
      throw new BadRequestError('Email in use');
    }
    
    const user = User.build({email, password});
    await user.save();

    res.status(201).send(user);
});

export {router as signupRouter};