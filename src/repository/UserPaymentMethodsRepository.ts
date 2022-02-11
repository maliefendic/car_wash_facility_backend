import { injectable } from 'inversify';
import { UserPaymentMethodsDTO } from '../model/UserPaymentMethodsDTO';
import { Transaction } from 'sequelize'
import { ErrorResponse } from '../util/ErrorResponse';
//import {logger} from'@/util/Logger'
const UserPaymentMethods = require('../database/models').UserPaymentMethods;
export interface UserPaymentMethodsRepository {
    find(id: number): Promise<UserPaymentMethodsDTO>;
    create(payment:any, transaction: Transaction): Promise<UserPaymentMethodsDTO> 
}

@injectable()
export class UserPaymentMethodsRepositoryImpl implements UserPaymentMethodsRepository {
    public async find(id: number): Promise<UserPaymentMethodsDTO> {
        const userPaymentMethods = await UserPaymentMethods.findByPk(id);
        if (!userPaymentMethods) throw new ErrorResponse("Transaction not found", 404);
        return userPaymentMethods;
    }
    public async create(payment:any, transaction: Transaction): Promise<UserPaymentMethodsDTO> {
    return  await  UserPaymentMethods.bulkCreate(payment, { transaction });
                  
    }
}
