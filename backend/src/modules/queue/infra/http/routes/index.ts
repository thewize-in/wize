import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../shared/infra/http/middlewares';
import { createOfflinePatientEntryController } from '../../../useCases/patientEntryBook/createOfflinePatientEntry';
import { getDoctorStatusByIdController } from '../../../useCases/doctor/getDoctorStatusById';
import { leaveDoctorController } from '../../../useCases/patient/leaveDoctor';
import { updateCurrentPatientNumberController } from '../../../useCases/patientEntryBook/updateCurrentPatientNumber';
import { createOnlinePatientEntryController } from '../../../useCases/patientEntryBook/createOnlinePatientEntry';

// import { getDoctorStatusByIdController } from '../../../useCases/doctor/getDoctorStatusById';
// import { joinDoctorQueueByDoctorIdController } from '../../../useCases/patient/joinDoctorQueue';

const doctorRouter = express.Router();

// userAccountRouter.use('/status', doctorStatusRouter);
doctorRouter.get('/doctor/:doctorId', authorizationMiddleware.ensureAuthenticated(), (req: Request, res: Response) => {
    getDoctorStatusByIdController.execute(req, res);
});

doctorRouter.post('/doctor/:id/join', authorizationMiddleware.ensureAuthenticated(), (req: Request, res: Response) => {
    createOnlinePatientEntryController.execute(req, res);
});
doctorRouter.post('/doctor/:id/leave', authorizationMiddleware.ensureAuthenticated(), (req: Request, res: Response) => {
    leaveDoctorController.execute(req, res);
});
doctorRouter.post(
    '/doctor/patient',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        createOfflinePatientEntryController.execute(req, res);
    },
);

doctorRouter.post(
    '/doctor/next',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsDoctor(),
    (req: Request, res: Response) => {
        updateCurrentPatientNumberController.execute(req, res);
    },
);

export { doctorRouter };
