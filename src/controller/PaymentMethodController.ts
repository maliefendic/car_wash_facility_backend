import { Request, Response, NextFunction, Application } from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { PaymentMethodService } from "../service/PaymentMethodService";
import { RegistrableController } from './RegisterableController';
import asyncHandler from '../middleware/Async';
import passport = require('passport');
import { authRoles } from '../middleware/Authorization';
@injectable()
export class PaymentMethodController implements RegistrableController {
  private paymentMethodService: PaymentMethodService;

  constructor(
    @inject(TYPES.PaymentMethodService)
    paymentMethodService: PaymentMethodService
  ) {
    this.paymentMethodService = paymentMethodService;
  }

  public register(app: Application): void {
    app.route("/payment-methods").get(
      passport.authenticate('jwt', { session: false }),
      authRoles(['admin']),
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const paymentMethods =
          await this.paymentMethodService.getPaymentMethods(req.body);
        return res.status(200).json(paymentMethods);
      })
    );

    app.route("/payment-method").post(
      passport.authenticate('jwt', { session: false }),
      authRoles(['admin']),
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const paymentMethod =
          await this.paymentMethodService.createPaymentMethod({
            name: req.body.name,
          });
        return res.status(200).json(paymentMethod);
      })
    );

    app
      .route("/payment-method/:id")
      .get(
        passport.authenticate('jwt', { session: false }),
        authRoles(['admin']),
        asyncHandler(
          async (req: Request, res: Response, next: NextFunction) => {
            const paymentMethod =
              await this.paymentMethodService.getPaymentMethod(req.params.id);
            return res.status(200).json({ paymentMethod });
          }
        )
      )
      .put(
        passport.authenticate('jwt', { session: false }),
        authRoles(['admin']),
        asyncHandler(
          async (req: Request, res: Response, next: NextFunction) => {
            const { name } = req.body;
            const paymentMethod =
              await this.paymentMethodService.updatePaymentMethod({
                id: req.params.id,
                name,
              });
            return res.status(200).json(paymentMethod);
          }
        )
      )
      .delete(
        passport.authenticate('jwt', { session: false }),
        authRoles(['admin']),
        asyncHandler(
          async (req: Request, res: Response, next: NextFunction) => {
            const paymentMethod =
              await this.paymentMethodService.deletePaymentMethod(
                req.params.id
              );
            return res.status(200).json(paymentMethod);
          }
        )
      );
  }
}
