import { Request, Response, NextFunction, Application } from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { OrderService } from '../service/OrderService';
import { RegistrableController } from './RegisterableController';
import asyncHandler from '../middleware/Async';
import {Token} from '../model/Token'
import passport = require('passport');
import { authRoles } from '../middleware/Authorization';
import {USER_TYPE, PAYMENT_TYPE} from "../util/Types";
@injectable()
export class OrderController implements RegistrableController {
    private orderService: OrderService;

    constructor(@inject(TYPES.OrderService) orderService: OrderService,) {
        this.orderService = orderService;
    }

    public register(app: Application): void {
        app.route('/orders')
            .get(passport.authenticate('jwt', { session: false }),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const user:any=req.user
                    if(user.role.id==USER_TYPE.user)
                    req.body.userId=user.id
                    const PaymentCategories = await this.orderService.getPaymentCategories(req.body)
                    return res.status(200).json(PaymentCategories);
                }));

        app.route('/order')
            .post(
                passport.authenticate('jwt', { session: false }),
                authRoles(['user']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const { programId,total,status, paymentMethodId} = req.body
                    const user:Token= req.user;
                    if(user.role==="admin") return res.status(200).json("Admin can't crate order");
                    const Orders = await this.orderService.createOrder({ userId:user.id ,programId,total,status,paymentMethodId})
                    return res.status(200).json(Orders);
                }));


        app.route('/order/:id')
            .get(passport.authenticate('jwt', { session: false }),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const Order = await this.orderService.getOrder(req.params.id)
                    return res.status(200).json({ Order });
                }))
            .put(passport.authenticate('jwt', { session: false }),
                 authRoles(['user']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const {  userId,discount,total,status } = req.body
                    const Order = await this.orderService.updateOrder({id:req.params.id, userId,discount,total,status })
                    return res.status(200).json(Order);
                }))
            .delete(passport.authenticate('jwt', { session: false }),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const Order = await this.orderService.deleteOrder(req.params.id)
                    return res.status(200).json(Order);
                }))


    }
}
