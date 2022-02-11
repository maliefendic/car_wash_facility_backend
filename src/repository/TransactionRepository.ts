import { injectable } from 'inversify';
import { TransactionDTO } from '../model/TransactionDTO';
import { Transaction } from 'sequelize'
import { ErrorResponse } from '../util/ErrorResponse';
//import {logger} from'@/util/Logger'
const Transactions = require('../database/models').Transactions;
const UserPaymentMethods = require('../database/models').UserPaymentMethods;

export interface TransactionRepository {
    findAll(query: object): Promise<Array<TransactionDTO>>;
    create(Transaction: TransactionDTO, transaction: Transaction): Promise<TransactionDTO>;
    update(Transaction: TransactionDTO, transaction: Transaction): Promise<string>;
    find(id: number): Promise<TransactionDTO>;
    deleteTransaction(id: number): Promise<string>;
}

@injectable()
export class TransactionRepositoryImpl implements TransactionRepository {

    public async findAll(query: any): Promise<Array<TransactionDTO>> {
        const { page, pageSize, orderBy = "createdAt", orderType = "DESC" } = query;
        const { limit, offset } = this.getPagination(page, pageSize);
        const data = await Transactions.findAndCountAll({
          limit,
          offset,
          include:[{model: UserPaymentMethods,as:"transaction"}],
          order: [[orderBy, orderType]],
        });
        return this.getPagingData(data, page, limit)
    }

    public async create(trans: TransactionDTO, transaction: Transaction): Promise<TransactionDTO> {
        return await Transactions.create(trans, { transaction });
    }

    public async update(trans: TransactionDTO, transaction: Transaction): Promise<string> {
        const findTransaction = await Transactions.findByPk(trans.id);
        if (!findTransaction) throw new ErrorResponse("Transaction not found", 404);
        await Transactions.update(trans, { where: { id: trans.id } }, { transaction });
        return "Transaction Updated";
    }

    public async find(id: number): Promise<TransactionDTO> {
        const transaction = await Transactions.findByPk(id,{include:[{model: UserPaymentMethods,as:"transaction"}],});
        if (!transaction) throw new ErrorResponse("Transaction not found", 404);

        return transaction;
    }

    public async deleteTransaction(id: number): Promise<string> {
        const transaction = await Transactions.findByPk(id);
        if (!transaction) throw new ErrorResponse("Transaction not found", 404);
        await transaction.destroy();
        return "Successfully deleted"

    }

    getPagination(page: number, size: number) {
        const limit = size ? +size : 5
        const offset = page ? limit * (page - 1) : 0
        return { limit, offset }
    }

    getPagingData(data: any, page: number, limit: number): Promise<Array<TransactionDTO>> {
        const { count: totalItems, rows: files } = data
        data.currentPage = page ? +page : 1
        data.totalPages = Math.ceil(totalItems / limit)
        return data;
    }
}
