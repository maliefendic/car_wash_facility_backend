import Joi = require('joi');
import {Request, Response, NextFunction} from 'express';
import  {ErrorResponse} from '../../util/errorResponse';
import  asyncHandler from "../Async";
const createProgramSchema = Joi.object({
  name: Joi.string().min(4).required().error(new ErrorResponse('Name: Minimum 4 character is required', 300)),
  description: Joi.string().min(4).required().error(new ErrorResponse('Description: Minimum 4 character is required', 300)),
  steps: Joi.array().min(1).required().error(new ErrorResponse('Please add steps to program', 300)),
  total: Joi.number().required()
});

 export const  createProgramValidation = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
  const newBody = await createProgramSchema.validateAsync(req.body)
  req.body = newBody;
  next()
})

