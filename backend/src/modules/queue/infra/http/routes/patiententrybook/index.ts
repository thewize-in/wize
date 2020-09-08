import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../../shared/infra/http/middlewares';
import { createPatientEntryBookController } from '../../../../useCases/patientEntryBook/createPatientEntryBook';
import { deletePatientEntryBookController } from '../../../../useCases/patientEntryBook/deletePatientEntryBook';
import { getPatientEntryBookController } from '../../../../useCases/patientEntryBook/getPatientEntryBook';
import { updateCurrentPatientNumberController } from '../../../../useCases/patientEntryBook/nextEntry';
import { isPatientEntryBookExistController } from '../../../../useCases/patientEntryBook/isPatientEntryBookExist';
import { createOfflinePatientEntryController } from '../../../../useCases/patientEntryBook/createOfflinePatientEntry';

const patientEntrybookRouter = express.Router();

patientEntrybookRouter.get(
  '/exist',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    isPatientEntryBookExistController.execute(req, res);
  }
);

patientEntrybookRouter.post(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    createPatientEntryBookController.execute(req, res);
  }
);
patientEntrybookRouter.delete(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    deletePatientEntryBookController.execute(req, res);
  }
);
patientEntrybookRouter.get(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    getPatientEntryBookController.execute(req, res);
  }
);
patientEntrybookRouter.post(
  '/entry',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    createOfflinePatientEntryController.execute(req, res);
  }
);

patientEntrybookRouter.post(
  '/next',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    updateCurrentPatientNumberController.execute(req, res);
  }
);

export { patientEntrybookRouter };
