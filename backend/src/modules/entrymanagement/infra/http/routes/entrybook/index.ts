import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../../shared/infra/http/middlewares';
import { createEntryBookController } from '../../../../useCases/EntryBook/createEntryBook';
import { deleteEntryBookController } from '../../../../useCases/EntryBook/deleteEntryBook';
import { getEntryBookController } from '../../../../useCases/EntryBook/getEntryBook';
import { updateCurrentPatientNumberController } from '../../../../useCases/EntryBook/nextEntry';
import { isEntryBookExistController } from '../../../../useCases/EntryBook/isEntryBookExist';
import { createOfflinePatientEntryController } from '../../../../useCases/EntryBook/createOfflinePatientEntry';

const entrybookRouter = express.Router();

entrybookRouter.get(
  '/exist',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    isEntryBookExistController.execute(req, res);
  }
);

entrybookRouter.post(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    createEntryBookController.execute(req, res);
  }
);
entrybookRouter.delete(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    deleteEntryBookController.execute(req, res);
  }
);
entrybookRouter.get(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    getEntryBookController.execute(req, res);
  }
);
entrybookRouter.post(
  '/entry',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    createOfflinePatientEntryController.execute(req, res);
  }
);

entrybookRouter.post(
  '/next',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    updateCurrentPatientNumberController.execute(req, res);
  }
);

export { entrybookRouter };
