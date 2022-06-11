import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

// these 4 parameters defines the errorHandler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // error must the type of CustomError
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.log('Something went wrong', err);
}