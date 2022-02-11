import { injectable, inject } from 'inversify';
import { TransactionRepository } from '../repository/TransactionRepository';
import TYPES from '../types';
import 'reflect-metadata';
import { TransactionDTO } from '../model/TransactionDTO';
import * as _ from 'lodash';
import { Transaction } from 'sequelize';
import { ErrorResponse } from '../util/ErrorResponse';
const sequelize = require("../database/models/index").sequelize;

export interface TransactionService {
    getTransactions(query: any): Promise<Array<TransactionDTO>>;
    createTransaction(name: any): Promise<TransactionDTO>;
    updateTransaction(Transaction:TransactionDTO): Promise<TransactionDTO>;
    getTransaction(id: number): Promise<TransactionDTO>;
    deleteTransaction(id: number): Promise<string>;
}

@injectable()
export class TransactionServiceImpl implements TransactionService {
  @inject(TYPES.TransactionRepository)
  private transactionRepository: TransactionRepository;

  public async getTransactions(query: any): Promise<TransactionDTO[]> {
    return await this.transactionRepository.findAll(query);
  }

  public async createTransaction(query: any): Promise<TransactionDTO> {
    return await sequelize.transaction(async (t: Transaction) => {
      return await this.transactionRepository.create(query, t);
    });
  }

  public async updateTransaction(
    Transaction: TransactionDTO
  ): Promise<TransactionDTO> {
    return await sequelize.transaction(async (t: Transaction) => {
      return await this.transactionRepository.update(Transaction, t);
    });
  }
  public async getTransaction(id: number): Promise<TransactionDTO> {
    return await this.transactionRepository.find(id);
  }
  public async deleteTransaction(id: number): Promise<string> {
    return await this.transactionRepository.deleteTransaction(id);
  }
}
