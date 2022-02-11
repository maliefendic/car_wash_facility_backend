import { injectable, inject } from 'inversify';
import { UserRepository } from '../repository/UserRepository';
import TYPES from '../types';
import 'reflect-metadata';
import { UserDTO } from '../model/UserDTO';
import * as _ from 'lodash';
import { Transaction } from 'sequelize';
import {ErrorResponse} from '../util/ErrorResponse';
import { UserPaymentMethodsRepository } from '../repository/UserPaymentMethodsRepository';
const sequelize = require("../database/models/index").sequelize;

export interface AuthService {
    generateToken(email: string, password: string): Promise<string>;
    register(user:UserDTO, indexPay:any[]): Promise<string>;
}

@injectable()
export class AuthServiceImpl implements AuthService {
    @inject(TYPES.UserRepository)
    private userRepositoryImp: UserRepository;
    @inject(TYPES.UserPaymentMethodsRepository)
    private userPaymentMethodsRepository: UserPaymentMethodsRepository;


    public async register(user:UserDTO,indexPay:number[]): Promise<string> {
        return await sequelize.transaction(async (t: Transaction) => {
            const newUser= await this.userRepositoryImp.create(user,indexPay, t);
            const object=[]
            indexPay.forEach(elem=>{object.push({
               paymentMethodId:elem,
               userId:newUser.id,
               credit:100
           })});
             await this.userPaymentMethodsRepository.create(object, t)
            return newUser;
        }); 
    }

    public async generateToken(email: string, password: string): Promise<string> {
        const user: any = await this.userRepositoryImp.findByEmail(email);
        if (!user) throw new ErrorResponse ("Invalid credentials",401);
        const isMatch = await user.matchPassword(password);
        if (!isMatch) throw new ErrorResponse ("Invalid credentials",401);
        const token = await user.getSignedJwtToken();
        return token;

    }


}
