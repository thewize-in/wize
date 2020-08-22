import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../../shared/infra/http/middlewares';
import { activateDoctorStatusController } from '../../../../useCases/doctor/activateDoctorStatus';
import { deactivateDoctorStatusController } from '../../../../useCases/doctor/deactivateDoctorStatus';
import { pauseDoctorStatusController } from '../../../../useCases/doctor/pauseDoctorStatus';
import { resumeDoctorStatusController } from '../../../../useCases/doctor/resumeDoctorStatus';

const doctorStatusRouter = express.Router();
doctorStatusRouter.post(
    '/activate',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        activateDoctorStatusController.execute(req, res);
    },
);

doctorStatusRouter.post(
    '/pause',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        pauseDoctorStatusController.execute(req, res);
    },
);
doctorStatusRouter.post(
    '/resume',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        resumeDoctorStatusController.execute(req, res);
    },
);
doctorStatusRouter.post(
    '/deactivate',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        deactivateDoctorStatusController.execute(req, res);
    },
);
export { doctorStatusRouter };
