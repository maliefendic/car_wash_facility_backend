import { injectable } from "inversify";
import { PaymentMethodDTO } from "../model/PaymentMethodDTO";
import { Transaction } from "sequelize";
import { ErrorResponse } from "../util/ErrorResponse";
//import {logger} from'@/util/Logger'
const PaymentMethod = require("../database/models").PaymentMethods;

export interface PaymentMethodRepository {
  findAll(query: object): Promise<Array<PaymentMethodDTO>>;
  create(
    paymentMethod: PaymentMethodDTO,
    transaction: Transaction
  ): Promise<PaymentMethodDTO>;
  update(
    paymentMethod: PaymentMethodDTO,
    transaction: Transaction
  ): Promise<string>;
  find(id: number): Promise<PaymentMethodDTO>;
  deletePaymentMethod(id: number): Promise<string>;
}

@injectable()
export class PaymentMethodRepositoryImpl implements PaymentMethodRepository {
  public async findAll(query: any): Promise<Array<PaymentMethodDTO>> {
    const { page, pageSize, orderBy = "createdAt", orderType = "DESC" } = query;

    const { limit, offset } = this.getPagination(page, pageSize);
    const data = await PaymentMethod.findAndCountAll({
      limit,
      offset,
      order: [[orderBy, orderType]],
    });
    return this.getPagingData(data, page, limit);
  }

  public async create(
    paymentMethod: PaymentMethodDTO,
    transaction: Transaction
  ): Promise<PaymentMethodDTO> {
    return await PaymentMethod.create(paymentMethod, { transaction });
  }

  public async update( paymentMethod: PaymentMethodDTO, transaction: Transaction): Promise<string> {
    const findPaymentMethod = await PaymentMethod.findByPk(paymentMethod.id);
    if (!findPaymentMethod)  throw new ErrorResponse("PaymentMethod not found", 404);
    await PaymentMethod.update( paymentMethod,{ where: { id: paymentMethod.id } },{ transaction } );
    return "PaymentMethod Updated";
  }

  public async find(id: number): Promise<PaymentMethodDTO> {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) throw new ErrorResponse("PaymentMethod not found", 404);

    return paymentMethod;
  }

  public async deletePaymentMethod(id: number): Promise<string> {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) throw new ErrorResponse("PaymentMethod not found", 404);
    await paymentMethod.destroy();
    return "Successfully deleted";
  }

  getPagination(page: number, size: number) {
    const limit = size ? +size : 5;
    const offset = page ? limit * (page - 1) : 0;
    return { limit, offset };
  }

  getPagingData(
    data: any,
    page: number,
    limit: number
  ): Promise<Array<PaymentMethodDTO>> {
    const { count: totalItems, rows: files } = data;
    data.currentPage = page ? +page : 1;
    data.totalPages = Math.ceil(totalItems / limit);
    return data;
  }
}
