import { Request, Response, NextFunction, Application } from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { ProgramStepService } from '../service/ProgramStepService';
import { RegistrableController } from './RegisterableController';
import asyncHandler from '../middleware/Async';
import passport = require('passport');
import { authRoles } from '../middleware/Authorization';
@injectable()
export class ProgramStepController implements RegistrableController {
    private programStepService: ProgramStepService;

    constructor(@inject(TYPES.ProgramStepService) programStepService: ProgramStepService) {
        this.programStepService = programStepService;
    }

    public register(app: Application): void {
        app.route('/program-steps')
            .get(passport.authenticate('jwt', { session: false }),
            authRoles(['admin']),
                    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const programSteps = await this.programStepService.getProgramSteps(req.body)
                    return res.status(200).json(programSteps);
                }));
        app.route('/program-step')
            .post(passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const programSteps = await this.programStepService.createProgramStep(req.body)
                    return res.status(200).json(programSteps);
                }));
        app.route('/program-step/:id')
            .get(passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const programStep = await this.programStepService.getProgramStep(req.params.id)
                    return res.status(200).json({ programStep });
                }))
            .put(passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                    const { name, description, cost } = req.body
                    const programStep = await this.programStepService.updateProgramStep({ id: req.params.id, name, description, cost })
                    return res.status(200).json({ programStep });
                }))
            .delete(passport.authenticate('jwt', { session: false }),
                authRoles(['admin']),
                asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

                    const programStep = await this.programStepService.deleteProgramStep(req.params.id)
                    return res.status(200).json(programStep);
                }))

    }
}
