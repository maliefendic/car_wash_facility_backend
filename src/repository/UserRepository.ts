import { injectable } from 'inversify';
import { UserDTO } from '../model/UserDTO';
import { Transaction } from 'sequelize'
import { ErrorResponse } from '../util/ErrorResponse';
import { Op } from "sequelize";
//import {logger} from'@/util/Logger'
const User = require('../database/models').Users;
const Role = require('../database/models').Roles;
const PaymentMethods = require('../database/models').PaymentMethods;

export interface UserRepository {
    findAll(query: object): Promise<Array<UserDTO>>;
    create(user: UserDTO, indexPay:any[], transaction: Transaction): Promise<UserDTO>;
    update(user: UserDTO, transaction: Transaction): Promise<UserDTO>;
    findByEmail(email: string): Promise<UserDTO>;
    find(id: number): Promise<UserDTO>;
    deleteUser(id:number): Promise<string>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {

    public async findAll(query: any): Promise<Array<UserDTO>> {
        const {
          page,
          pageSize,
          orderBy = "createdAt",
          orderType = "DESC",
          search = "",
        } = query;
       
        const { limit, offset } = this.getPagination(page, pageSize);
        const data = await User.findAndCountAll({
          where: {
            [Op.and]: {roleId: 2},
            [Op.or]: {
              lastName: { [Op.iLike]: `%${search}%` },
              firstName: { [Op.iLike]: `%${search}%` },
              location: { [Op.iLike]: `%${search}%` },
              email: { [Op.iLike]: `%${search}%` },
            },
          },
          include: [{ model: Role, as: "role" }],
          limit,
          offset,
          order: [[orderBy, orderType]],
          attributes: {
            exclude: ["password"],
          },
        });
        return this.getPagingData(data, page, limit)
    }

    public async findByEmail(email: string): Promise<UserDTO> {
        return await User.findOne({ where: { email } });
    }
    public async create(user: UserDTO ,indexPay:any[],transaction: Transaction): Promise<UserDTO> {
        
    
        const exitUser= await User.findOne({where:{email: user.email}});
        if(exitUser) throw new ErrorResponse('Some one use this email', 401)
        const use= await User.create(user, { transaction });
        return use;
    }

    public async update(user: UserDTO, transaction: Transaction): Promise<UserDTO> {
        return await User.update(user, { where: { id: user.id } }, { transaction });
    }

    public async find(id: number): Promise<UserDTO> {
        const user= await User.findByPk(id, {
            include: [{ model: Role, as: "role" },{model: PaymentMethods, through: {attributes: ['id']}}], attributes: {
                exclude: ["password"],
            },
        });
        if(!user) throw new ErrorResponse("User not found", 404 );

        return user;
    }

    public async deleteUser(id: number): Promise<string>{
        const user= await User.findByPk(id);
        if(!user) throw new ErrorResponse("User not found", 404 );
        await user.destroy();
        return "Successfully deleted"
    }

    getPagination(page: number, size: number) {
        const limit = size ? +size : 5
        const offset = page ? limit * (page - 1) : 0
        return { limit, offset }
    }

    getPagingData(data: any, page: number, limit: number): Promise<Array<UserDTO>> {
        const { count: totalItems, rows: files } = data
        data.currentPage = page ? +page : 1
        data.totalPages = Math.ceil(totalItems / limit)
        return data;
    }
}
