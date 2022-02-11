import Joi = require('joi');
import {Request, Response, NextFunction} from 'express';
import  {ErrorResponse} from '../../util/errorResponse';
import  asyncHandler from "../Async";
const createAuthSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).error(new ErrorResponse('Wrong credential', 401)),
  password: Joi.string().min(4).required().error(new ErrorResponse('Wrong credential', 401)),
  lastName: Joi.string().allow('').optional(),
  firstName: Joi.string().allow('').optional()
});

 export const  authValidation = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
  const newBody = await createAuthSchema.validateAsync(req.body)
  req.body = newBody
  next()
})

