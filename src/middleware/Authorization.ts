import {Request, Response, NextFunction} from 'express';
import { ErrorResponse } from "../util/ErrorResponse";
export function authRoles(role:string[]) {
    return async (req:Request, res:Response, next:NextFunction) => { 
        
        const user: any =req.user
  
        if (!role.includes(user.role.name)) return next(new ErrorResponse('Not authorized to access this route', 401));

        next();
    
    }
  
}