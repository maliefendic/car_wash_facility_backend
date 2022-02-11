import { injectable } from 'inversify';
import { ProgramStepDTO } from '../model/ProgramStepDTO';
import { Transaction } from 'sequelize'
import { ErrorResponse } from '../util/ErrorResponse';
//import {logger} from'@/util/Logger'
const Program = require('../database/models').Programs;
const ProgramStep = require('../database/models').ProgramSteps;

export interface ProgramStepRepository {
    findAll(query: object): Promise<Array<ProgramStepDTO>>;
    create(ProgramStep: ProgramStepDTO, transaction: Transaction): Promise<ProgramStepDTO>;
    update(ProgramStep: ProgramStepDTO, transaction: Transaction): Promise<string>;
    find(id: number): Promise<ProgramStepDTO>;
    deleteProgramStep(id: number): Promise<string>;
}

@injectable()
export class ProgramStepRepositoryImpl implements ProgramStepRepository {

    public async findAll(query: any): Promise<Array<ProgramStepDTO>> {
        const { page, pageSize, orderBy = "createdAt", orderType = "DESC" } = query;

        const { limit, offset } = this.getPagination(page, pageSize);
        const data = await ProgramStep.findAll({
            
            order: [[orderBy, orderType]],
        });
        return data;
    }

    
    public async create(programStep: ProgramStepDTO, transaction: Transaction): Promise<ProgramStepDTO> {
        return await ProgramStep.create(programStep, { transaction });
    }

    public async update(programStep: ProgramStepDTO, transaction: Transaction): Promise<string> {
        const programStepFind=await ProgramStep.findByPk(programStep.id);
        if(!programStepFind) throw new ErrorResponse("ProgramStep not found", 404 );
        await ProgramStep.update(programStep, { where: { id: programStep.id } }, { transaction });
        return "Program step updated";
    }

    public async find(id: number): Promise<ProgramStepDTO> {
        const programStep= await ProgramStep.findByPk(id);
        if(!programStep) throw new ErrorResponse("ProgramStep not found", 404 );
        return programStep;
    }

    public async  deleteProgramStep(id: number): Promise<string>{
        const programStep= await ProgramStep.findByPk(id);
        if(!programStep) throw new ErrorResponse("ProgramStep not found", 404 );
        await programStep.destroy();
        return "Successfully deleted"

    }
    getPagination(page: number, size: number) {
        const limit = size ? +size : 5
        const offset = page ? limit * (page - 1) : 0
        return { limit, offset }
    }

    getPagingData(data: any, page: number, limit: number): Promise<Array<ProgramStepDTO>> {
        const { count: totalItems, rows: files } = data
        data.currentPage = page ? +page : 1
        data.totalPages = Math.ceil(totalItems / limit)
        return data;
    }
}
