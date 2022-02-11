import { Request, Response, NextFunction, Application } from "express";
import { injectable, inject } from "inversify";
import TYPES from "../types";
import { TransactionService } from "../service/TransactionService";
import { RegistrableController } from "./RegisterableController";
import asyncHandler from "../middleware/Async";
import passport = require('passport');
import { authRoles } from '../middleware/Authorization';
import {USER_TYPE, PAYMENT_TYPE} from "../util/Types";
@injectable()
export class TransactionController implements RegistrableController {
  private transactionService: TransactionService;

  constructor(
    @inject(TYPES.TransactionService) transactionService: TransactionService
  ) {
    this.transactionService = transactionService;
  }

  public register(app: Application): void {
    
    
    app.route("/transactions").get(passport.authenticate('jwt', { session: false }),
      asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user:any=req.user
        if(user.role.id==USER_TYPE.user)
            req.body.userId=user.id
        const Transactions = await this.transactionService.getTransactions(req.body);
        return res.status(200).json(Transactions);
      })
    );
      app.route('/transaction/:id')
      .get(passport.authenticate('jwt', { session: false }),
          asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const Transaction = await this.transactionService.getTransaction( req.params.id );
            return res.status(200).json({ Transaction });
          }))
      .delete(passport.authenticate('jwt', { session: false }),
          asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const Transaction = await this.transactionService.deleteTransaction( req.params.id );
            return res.status(200).json(Transaction);
          }))
  }
}
