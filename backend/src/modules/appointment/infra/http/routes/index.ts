import express, { Request, Response } from 'express';
import { createNewAppointmentController } from '../../../useCases/createNewAppointment';

const appointmentRouter = express.Router();

appointmentRouter.post(
  '/',
  //   authorizationMiddleware.ensureAuthenticated(),
  //   authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    createNewAppointmentController.execute(req, res);
  }
);

export { appointmentRouter };
