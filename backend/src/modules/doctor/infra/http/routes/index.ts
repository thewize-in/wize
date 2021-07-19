import express, { Request, Response } from 'express';
import { addNewDoctorController } from '../../../useCases/addNewDoctor';

const doctorRouter = express.Router();

doctorRouter.post(
  '/',
  //   authorizationMiddleware.ensureAuthenticated(),
  //   authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    addNewDoctorController.execute(req, res);
  }
);

export { doctorRouter };
