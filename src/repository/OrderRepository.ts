import { injectable } from 'inversify';
import { OrderDTO } from '../model/OrderDTO';
import { Transaction } from 'sequelize'
import { ErrorResponse } from '../util/ErrorResponse';
//import {logger} from'@/util/Logger'
const Order = require('../database/models').Orders;

export interface OrderRepository {
    findAll(query: object): Promise<Array<OrderDTO>>;
    create(Order: any, transaction: Transaction): Promise<OrderDTO>;
    update(Order: OrderDTO, transaction: Transaction): Promise<string>;
    find(id: number): Promise<OrderDTO>;
    deleteOrder(id: number): Promise<string>;
}

@injectable()
export class OrderRepositoryImpl implements OrderRepository {

    public async findAll(query: any): Promise<Array<OrderDTO>> {
        let where={}
        if(query.userId)
        where={userId:query.userId}
        const { page, pageSize, orderBy = "createdAt", orderType = "DESC" } = query;
        const { limit, offset } = this.getPagination(page, pageSize);
        const data = await Order.findAndCountAll({
            limit,
            where,
            offset,
            order: [[orderBy, orderType]],
        });
        return this.getPagingData(data, page, limit)
    }


    public async create(order: any, transaction: Transaction): Promise<OrderDTO> {
        const count = await Order.count({where:{userId: order.userId}})
        let discount: number=0;
        if(count!=0 && (count+1)%10==0){discount=100;}
        const newOrder= await Order.create({discount, userId:order.userId, total:order.total,
            programId:order.programId ,status: order.status}, { transaction  });
        return newOrder;
    }

    public async update(order: OrderDTO, transaction: Transaction): Promise<string> {
        const findOrder = await Order.findByPk(order.id);
        if (!findOrder) throw new ErrorResponse("Order not found", 404);
        await Order.update(order, { where: { id: order.id } }, { transaction });
        return "Order Updated";
    }

    public async find(id: number): Promise<OrderDTO> {
        const order = await Order.findByPk(id);
        if (!order) throw new ErrorResponse("Order not found", 404);

        return order;
    }

    public async deleteOrder(id: number): Promise<string> {
        const order = await Order.findByPk(id);
        if (!order) throw new ErrorResponse("Order not found", 404);
        await order.destroy();
        return "Successfully deleted"

    }

    getPagination(page: number, size: number) {
        const limit = size ? +size : 5
        const offset = page ? limit * (page - 1) : 0
        return { limit, offset }
    }

    getPagingData(data: any, page: number, limit: number): Promise<Array<OrderDTO>> {
        const { count: totalItems, rows: files } = data
        data.currentPage = page ? +page : 1
        data.totalPages = Math.ceil(totalItems / limit)
        return data;
    }
}
