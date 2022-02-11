import { Request, Response, NextFunction, Application } from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { ProgramService } from '../service/ProgramService';
import { RegistrableController } from './RegisterableController';
import asyncHandler from '../middleware/Async';
import passport = require('passport');
import {createProgramValidation} from '../middleware/validation/program.validation'
import { authRoles } from '../middleware/Authorization';

@injectable()
export class ProgramController implements RegistrableController {
    private programService: ProgramService;
    constructor(@inject(TYPES.ProgramService) programService: ProgramService,) {
        this.programService = programService;
    }

    public register(app: Application): void {
        app.route('/programs')
            .get( passport.authenticate('jwt', { session: false }),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const programs = await this.programService.getPrograms(req.query)
                    return res.status(200).json(programs);
                }));

        app.route('/program')
            .post(
                createProgramValidation,
                passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const { name, description,steps, total}= req.body;
                    const programs = await this.programService.createProgram({  name, description,steps, total});
                    return res.status(200).json(programs);
                }));


        app.route('/program/:id')
            .get(passport.authenticate('jwt', { session: false }),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const program = await this.programService.getProgram(req.params.id)
                    return res.status(200).json({ program });
                }))
            .put(
                passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const { name } = req.body
                    const program = await this.programService.updateProgram({ id: req.params.id, name })
                    return res.status(200).json({ program });
                }))
            .delete(
                passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

                    const program = await this.programService.deleteProgram(req.params.id)
                    return res.status(200).json(program);
                }))


    }
}
