import { injectable, inject } from 'inversify';
import { ProgramStepRepository } from '../repository/ProgramStepRepository';
import TYPES from '../types';
import 'reflect-metadata';
import { ProgramStepDTO } from '../model/ProgramStepDTO';
import * as _ from 'lodash';
import { Transaction } from 'sequelize';
import { ErrorResponse } from '../util/ErrorResponse';
const sequelize = require("../database/models/index").sequelize;

export interface ProgramStepService {
    getProgramSteps(query: any): Promise<Array<ProgramStepDTO>>;
    createProgramStep(name: string): Promise<ProgramStepDTO>;
    updateProgramStep(programStep:ProgramStepDTO): Promise<ProgramStepDTO>;
    getProgramStep(id: number): Promise<ProgramStepDTO>;
    deleteProgramStep(id: number): Promise<string>;
}

@injectable()
export class ProgramStepServiceImpl implements ProgramStepService {
    @inject(TYPES.ProgramStepRepository)
    private programStepRepository: ProgramStepRepository;


    public async getProgramSteps(query: any): Promise<ProgramStepDTO[]> {
        return await this.programStepRepository.findAll(query);
    }

    public async createProgramStep(body: any): Promise<ProgramStepDTO> {
        const { name,description,cost }=body
        return await sequelize.transaction(async (t: Transaction) => {
            return await this.programStepRepository.create({name, description,cost}, t);
        });
    }

    public async updateProgramStep(programStep:ProgramStepDTO): Promise<ProgramStepDTO> {
        return await sequelize.transaction(async (t: Transaction) => {
            return await this.programStepRepository.update(programStep, t);
        });
    }
    public async getProgramStep(id: number): Promise<ProgramStepDTO> {
        return await this.programStepRepository.find(id)
    }
    public async deleteProgramStep(id: number): Promise<string> {
        return await this.programStepRepository.deleteProgramStep(id)
    }
}
