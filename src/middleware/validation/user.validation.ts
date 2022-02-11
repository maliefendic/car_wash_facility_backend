import Joi = require('joi');
import {Request, Response, NextFunction} from 'express';
import  {ErrorResponse} from '../../util/errorResponse';
import  asyncHandler from "../Async";
const createUserSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).error(new ErrorResponse('Incorrect email', 401)),
  password: Joi.string().min(4).required().error(new ErrorResponse('Minimum 4 character is required', 401)),
  lastName: Joi.string().allow('').optional(),
  firstName: Joi.string().allow('').optional(),
  location: Joi.string().allow('').optional(),
  creditCard:Joi.bool().optional(),
  bitcoin:Joi.bool().optional(),
  bank:Joi.bool().optional(),
  cash:Joi.bool().optional(),
});

 export const  createUserValidation = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
  const newBody = await createUserSchema.validateAsync(req.body)
  req.body = newBody;
  next()
})

