import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
  (req: Request, res: Response) => {
    const validationErrors = validationResult(req);

    // if there's a validation error, throw RequestValidationError
    if (!validationErrors.isEmpty()) {
      throw new RequestValidationError(validationErrors.array());
    }
    
    console.log('Creating a user...');
    throw new DatabaseConnectionError();
    res.send({});
});

export {router as signupRouter};