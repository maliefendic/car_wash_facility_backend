import { Request, Response, NextFunction, Application } from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { UserService } from '../service/UserService';
import { RegistrableController } from './RegisterableController';
import asyncHandler from '../middleware/Async';
import passport = require('passport');
import { authRoles } from '../middleware/Authorization';
@injectable()
export class UserController implements RegistrableController {
    private userService: UserService;

    constructor(@inject(TYPES.UserService) userService: UserService) {
        this.userService = userService;
    }

    public register(app: Application): void {
        app.route('/users')
            .get(passport.authenticate('jwt', { session: false }),
            authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                  
                    const users = await this.userService.getUsers(req.query)
                    return res.status(200).json(users);
                }));
        app.route('/user/:id')
            .get(
                passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const user = await this.userService.getUser(req.params.id)
                    return res.status(200).json(user);
                }))
            .put(
                passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const { email, password, firstName, lastName,location } = req.body
                    const user = await this.userService.updateUser({ id: req.params.id, email, password, firstName, lastName,location })
                    return res.status(200).json(user);
                }))
            .delete(
                passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const user = await this.userService.deleteUser(req.params.id)
                    return res.status(200).json(user);
                }))

    }
}
