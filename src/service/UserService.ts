import { injectable, inject } from 'inversify';
import { UserRepository } from '../repository/UserRepository';
import TYPES from '../types';
import 'reflect-metadata';
import { UserDTO } from '../model/UserDTO';
import * as _ from 'lodash';
import { Transaction } from 'sequelize';
import { ErrorResponse } from '../util/ErrorResponse';
const sequelize = require("../database/models/index").sequelize;

export interface UserService {
    getUsers(query: any): Promise<Array<UserDTO>>;
    updateUser(user:UserDTO): Promise<UserDTO>;
    getUser(id: number): Promise<UserDTO>;
    deleteUser(id: number): Promise<string>;
}

@injectable()
export class UserServiceImpl implements UserService {
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository;


    public async getUsers(query: any): Promise<UserDTO[]> {
        return await this.userRepository.findAll(query);
    }

    public async updateUser(user:UserDTO): Promise<UserDTO> {
        return await sequelize.transaction(async (t: Transaction) => {
            return await this.userRepository.update(user, t);
        });
    }
    public async getUser(id: number): Promise<UserDTO> {
        return await this.userRepository.find(id)
    }

    public async deleteUser(id: number): Promise<string> {
        return await this.userRepository.deleteUser(id)
    }

}
