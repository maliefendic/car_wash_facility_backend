import { Request, Response, NextFunction, Application } from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { AuthService } from '../service/AuthService';
import { RegistrableController } from './RegisterableController';
import asyncHandler from '../middleware/Async';
import { UserDTO } from '../model/UserDTO';
import {USER_TYPE, PAYMENT_TYPE} from "../util/Types";
import passport = require('passport');
import {authValidation} from '../middleware/validation/auth.validation'
import {createUserValidation} from '../middleware/validation/user.validation'
import { authRoles } from '../middleware/Authorization';
@injectable()
export class AuthController implements RegistrableController {
    private authService: AuthService;

    constructor(@inject(TYPES.AuthService) authService: AuthService) {
        this.authService = authService;
      
    }

    public register(app: Application): void {
        app.route('/auth/login')
            .post(authValidation,
                asyncHandler(
                    async (req: Request, res: Response, next: NextFunction) => {
                    const { email, password } = req.body
                    const token = await this.authService.generateToken(email, password);
                    this.sendTokenResponse(token, res,"Login successful",req)
                }));
        app.route('/auth/register')
            .post(
                createUserValidation,
                passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const { email, password, firstName, lastName,location } = req.body
                    const { creditCard, bitcoin,cash,bank} = req.body
                    let paymentIndex=[creditCard?PAYMENT_TYPE.creditCard:null, bitcoin?PAYMENT_TYPE.bitcoin:null,
                         cash?PAYMENT_TYPE.cash:null,bank?PAYMENT_TYPE.bank:null].filter(n => n)
                    const user: UserDTO = { email, password, firstName, lastName, roleId: USER_TYPE.user ,location,isConfirmed:true, isBaned:false}
                  
                  
                    const token = await this.authService.register(user,paymentIndex);
                    return res.status(200).json({ message: "User registered" });
                }));
                app.route('/auth/logout')
                .post(
                    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                        this.sendTokenResponse("", res,"Logout successful",req)
                    }));
    }
  
    sendTokenResponse = (token: any, res: any, message:string, req) => {
        const options = {
            expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE, 10) * 24 * 60 * 60 * 1000,),
            sameSite: 'none', secure: false 
            // process.env.COOKIE_SECURE=="true"? true:false,
        }
     return res.status(200).cookie('token', token, options).json({ message});

    };


}
