import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../shared/infra/http/middlewares';
import { activateDoctorStatusController } from '../../../useCases/doctor/activateDoctorStatus';
import { deactivateDoctorStatusController } from '../../../useCases/doctor/deactivateDoctorStatus';
import { pauseDoctorStatusController } from '../../../useCases/doctor/pauseDoctorStatus';
import { resumeDoctorStatusController } from '../../../useCases/doctor/resumeDoctorStatus';
import { getDoctorStatusByIdController } from '../../../useCases/doctor/getDoctorStatusById';

const doctorRouter = express.Router();

doctorRouter.post(
    '/activate',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        activateDoctorStatusController.execute(req, res);
    },
);

doctorRouter.post(
    '/deactivate',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        deactivateDoctorStatusController.execute(req, res);
    },
);
doctorRouter.post(
    '/pause',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        pauseDoctorStatusController.execute(req, res);
    },
);

doctorRouter.post(
    '/resume',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        resumeDoctorStatusController.execute(req, res);
    },
);
doctorRouter.get('/doctor/:id', authorizationMiddleware.ensureAuthenticated(), (req: Request, res: Response) => {
    getDoctorStatusByIdController.execute(req, res);
});
export { doctorRouter };
