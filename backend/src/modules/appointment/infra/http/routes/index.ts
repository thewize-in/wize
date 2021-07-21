import express, { Request, Response } from 'express';
import { createNewAppointmentController } from '../../../useCases/createNewAppointment';
import { getAppointmentsController } from '../../../useCases/GetAppointments';

const appointmentRouter = express.Router();

appointmentRouter.post(
  '/',
  //   authorizationMiddleware.ensureAuthenticated(),
  //   authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    createNewAppointmentController.execute(req, res);
  }
);
appointmentRouter.get(
  '/',
  //   authorizationMiddleware.ensureAuthenticated(),
  //   authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    getAppointmentsController.execute(req, res);
  }
);

export { appointmentRouter };
