import { injectable, inject } from 'inversify';
import { ProgramRepository } from '../repository/ProgramRepository';
import TYPES from '../types';
import 'reflect-metadata';
import { ProgramDTO } from '../model/ProgramDTO';
import * as _ from 'lodash';
import { Transaction } from 'sequelize';
import { ErrorResponse } from '../util/ErrorResponse';
const sequelize = require("../database/models/index").sequelize;

export interface ProgramService {
    getPrograms(query: any): Promise<Array<ProgramDTO>>;
    createProgram(name: any): Promise<ProgramDTO>;
    updateProgram(program:ProgramDTO): Promise<ProgramDTO>;
    getProgram(id: number): Promise<ProgramDTO>;
    deleteProgram(id: number): Promise<string>;
}

@injectable()
export class ProgramServiceImpl implements ProgramService {
    @inject(TYPES.ProgramRepository)
    private programRepository: ProgramRepository;


    public async getPrograms(query: any): Promise<ProgramDTO[]> {
        return await this.programRepository.findAll(query);
    }

    public async createProgram(query: any): Promise<ProgramDTO> {
        return await sequelize.transaction(async (t: Transaction) => {

            return await this.programRepository.create(query, t);
           
        });
    }

    public async updateProgram(program:ProgramDTO): Promise<ProgramDTO> {
        return await sequelize.transaction(async (t: Transaction) => {
            return await this.programRepository.update(program, t);
        });
    }
    public async getProgram(id: number): Promise<ProgramDTO> {
        return await this.programRepository.find(id)
    }
    public async deleteProgram(id: number): Promise<string> {
        return await this.programRepository.deleteProgram(id)
    }

}
