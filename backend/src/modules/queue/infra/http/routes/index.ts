import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../shared/infra/http/middlewares';
import { getDoctorStatusByIdController } from '../../../useCases/doctor/getDoctorStatusById';
import { leaveDoctorController } from '../../../useCases/patient/leaveDoctor';
import { createOnlinePatientEntryController } from '../../../useCases/patientEntryBook/createOnlinePatientEntry';

const doctorRouter = express.Router();

// userAccountRouter.use('/status', doctorStatusRouter);
doctorRouter.get(
  '/doctor/:doctorId',
  authorizationMiddleware.ensureAuthenticated(),
  (req: Request, res: Response) => {
    getDoctorStatusByIdController.execute(req, res);
  }
);

doctorRouter.post(
  '/doctor/:id/join',
  authorizationMiddleware.ensureAuthenticated(),
  (req: Request, res: Response) => {
    createOnlinePatientEntryController.execute(req, res);
  }
);
doctorRouter.post(
  '/doctor/:id/leave',
  authorizationMiddleware.ensureAuthenticated(),
  (req: Request, res: Response) => {
    leaveDoctorController.execute(req, res);
  }
);

export { doctorRouter };
