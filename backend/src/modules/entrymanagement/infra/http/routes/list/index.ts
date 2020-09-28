import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../../shared/infra/http/middlewares';
import { addNewEntryController } from '../../../../useCases/List/addNewEntry';
import { createNewListController } from '../../../../useCases/List/createNewList';
import { closeListController } from '../../../../useCases/List/closeList';
import { getListController } from '../../../../useCases/List/getList';
import { isListExistController } from '../../../../useCases/List/isListExist';
import { nextEntryController } from '../../../../useCases/List/nextEntry';
import { getArchivedListMetadataController } from '../../../../useCases/List/getArchivedListMetadata';
import { getArchivedListController } from '../../../../useCases/List/getArchivedList';

const listRouter = express.Router();

listRouter.get(
  '/exist',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    isListExistController.execute(req, res);
  }
);

listRouter.post(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    createNewListController.execute(req, res);
  }
);
listRouter.delete(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    closeListController.execute(req, res);
  }
);
listRouter.get(
  '/',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    getListController.execute(req, res);
  }
);
listRouter.post(
  '/entry',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    addNewEntryController.execute(req, res);
  }
);

listRouter.post(
  '/next',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    nextEntryController.execute(req, res);
  }
);
listRouter.post(
  '/archivedlist',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    getArchivedListMetadataController.execute(req, res);
  }
);
listRouter.get(
  '/archivedlist/:listid',
  authorizationMiddleware.ensureAuthenticated(),
  authorizationMiddleware.ensureUserIsDoctor(),
  (req: Request, res: Response) => {
    getArchivedListController.execute(req, res);
  }
);

export { listRouter };
