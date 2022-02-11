import { injectable, inject } from 'inversify';
import { OrderRepository } from '../repository/OrderRepository';
import TYPES from '../types';
import 'reflect-metadata';
import { OrderDTO } from '../model/OrderDTO';
import * as _ from 'lodash';
import { Transaction } from 'sequelize';
import { ErrorResponse } from '../util/ErrorResponse';
import { TransactionRepository } from '../repository/TransactionRepository';
import {UserPaymentMethodsRepository} from '../repository/UserPaymentMethodsRepository';

const sequelize = require("../database/models/index").sequelize;

export interface OrderService {
    getPaymentCategories(query: any): Promise<Array<OrderDTO>>;
    createOrder(object: any): Promise<OrderDTO>;
    updateOrder(order:OrderDTO): Promise<OrderDTO>;
    getOrder(id: number): Promise<OrderDTO>;
    deleteOrder(id: number): Promise<string>;
}

@injectable()
export class OrderServiceImpl implements OrderService {
    @inject(TYPES.OrderRepository)
    private OrderRepository: OrderRepository;
    @inject(TYPES.TransactionRepository)
    private transactionRepository: TransactionRepository;
    @inject(TYPES.UserPaymentMethodsRepository)
    private userPaymentMethodsRepository: UserPaymentMethodsRepository;


    public async getPaymentCategories(query: any): Promise<OrderDTO[]> {
        return await this.OrderRepository.findAll(query);
    }

    public async createOrder(query: any): Promise<OrderDTO> {
        return await sequelize.transaction(async (t: Transaction) => {
            const order= await this.OrderRepository.create(query, t);
            const credit:any= await this.userPaymentMethodsRepository.find(query.paymentMethodId);
            if(credit.credit- query.total<0) throw new ErrorResponse("You dont have enough credit", 300);
            credit.credit=credit.credit-query.total;
            await credit.save();
            await this.transactionRepository.create({userPaymentMethodsId: query.paymentMethodId, orderId:order.id},t);
            
            return order;
        });
    }

    public async updateOrder(Order:OrderDTO): Promise<OrderDTO> {
        return await sequelize.transaction(async (t: Transaction) => {
            return await this.OrderRepository.update(Order, t);
        });
    }
    public async getOrder(id: number): Promise<OrderDTO> {
        return await this.OrderRepository.find(id)
    }
    public async deleteOrder(id: number): Promise<string> {
        return await this.OrderRepository.deleteOrder(id)
    }

}
