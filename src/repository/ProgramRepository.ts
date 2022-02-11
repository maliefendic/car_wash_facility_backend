import { injectable } from 'inversify';
import { ProgramDTO } from '../model/ProgramDTO';
import { ProgramStepDTO } from '../model/ProgramStepDTO';
import { Transaction } from 'sequelize'
import { ErrorResponse } from '../util/ErrorResponse';
import { Op } from "sequelize";
//import {logger} from'@/util/Logger'
const Program = require('../database/models').Programs;
const ProgramSteps = require('../database/models').ProgramSteps;

export interface ProgramRepository {
    findAll(query: object): Promise<Array<ProgramDTO>>;
    create(program: ProgramDTO, transaction: Transaction): Promise<ProgramDTO>;
    update(program: ProgramDTO, transaction: Transaction): Promise<string>;
    find(id: number): Promise<ProgramDTO>;
    deleteProgram(id: number): Promise<string>;
}

@injectable()
export class ProgramRepositoryImpl implements ProgramRepository {

    public async findAll(query: any): Promise<Array<ProgramDTO>> {
        const { page, pageSize, orderBy = "createdAt", orderType = "DESC" ,search=""} = query;
        const { limit, offset } = this.getPagination(page, pageSize);
        const data = await Program.findAndCountAll({
          where: {
            [Op.or]: {
              description: { [Op.iLike]: `%${search}%` },
              name: { [Op.iLike]: `%${search}%` }
            },
          },
          limit,
          offset,
          order: [[orderBy, orderType]],
        });
        return this.getPagingData(data, page, limit)
    }


    public async create(program: ProgramDTO, transaction: Transaction): Promise<ProgramDTO> {
        const { name, description, total, steps}=program
        
        const prog= await Program.create({name, description, total}, { transaction });
        await prog.addSteps(steps, { transaction });
        return prog;
    }

    public async update(program: ProgramDTO, transaction: Transaction): Promise<string> {
        const findProgram = await Program.findByPk(program.id);
        if (!findProgram) throw new ErrorResponse("Program not found", 404);
        await Program.update(program, { where: { id: program.id } }, { transaction });
        return "Program Updated";
    }

    public async find(id: number): Promise<ProgramDTO> {
        const program = await Program.findOne( { where:{id},
            include: [{ model: ProgramSteps, as:"steps" }]
        });
        if (!program) throw new ErrorResponse("Program not found", 404);

        return program;
    }

    public async deleteProgram(id: number): Promise<string> {
        const program = await Program.findByPk(id);
        if (!program) throw new ErrorResponse("Program not found", 404);
        await program.destroy();
        return "Successfully deleted"

    }

    getPagination(page: number, size: number) {
        const limit = size ? +size : 5
        const offset = page ? limit * (page - 1) : 0
        return { limit, offset }
    }

    getPagingData(data: any, page: number, limit: number): Promise<Array<ProgramDTO>> {
        const { count: totalItems, rows: files } = data
        data.currentPage = page ? +page : 1
        data.totalPages = Math.ceil(totalItems / limit)
        return data;
    }
}
