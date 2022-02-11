import { injectable, inject } from "inversify";
import { PaymentMethodRepository } from "../repository/PaymentMethodRepository";
import TYPES from "../types";
import "reflect-metadata";
import { PaymentMethodDTO } from "../model/PaymentMethodDTO";
import * as _ from "lodash";
import { Transaction } from "sequelize";
import { ErrorResponse } from "../util/ErrorResponse";
const sequelize = require("../database/models/index").sequelize;

export interface PaymentMethodService {
  getPaymentMethods(query: any): Promise<Array<PaymentMethodDTO>>;
  createPaymentMethod(name: any): Promise<PaymentMethodDTO>;
  updatePaymentMethod(
    paymentMethod: PaymentMethodDTO
  ): Promise<PaymentMethodDTO>;
  getPaymentMethod(id: number): Promise<PaymentMethodDTO>;
  deletePaymentMethod(id: number): Promise<string>;
}

@injectable()
export class PaymentMethodServiceImpl implements PaymentMethodService {
  @inject(TYPES.PaymentMethodRepository)
  private paymentMethodRepository: PaymentMethodRepository;

  public async getPaymentMethods(query: any): Promise<PaymentMethodDTO[]> {
    return await this.paymentMethodRepository.findAll(query);
  }

  public async createPaymentMethod(query: any): Promise<PaymentMethodDTO> {
    return await sequelize.transaction(async (t: Transaction) => {
      return await this.paymentMethodRepository.create(query, t);
    });
  }

  public async updatePaymentMethod(
    paymentMethod: PaymentMethodDTO
  ): Promise<PaymentMethodDTO> {
    return await sequelize.transaction(async (t: Transaction) => {
      return await this.paymentMethodRepository.update(paymentMethod, t);
    });
  }
  public async getPaymentMethod(id: number): Promise<PaymentMethodDTO> {
    return await this.paymentMethodRepository.find(id);
  }
  public async deletePaymentMethod(id: number): Promise<string> {
    return await this.paymentMethodRepository.deletePaymentMethod(id);
  }
}
