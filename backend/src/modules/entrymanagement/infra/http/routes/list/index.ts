import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../../shared/infra/http/middlewares';
import { addNewEntryController } from '../../../../useCases/List/addNewEntry';
import { createNewListController } from '../../../../useCases/List/createNewList';
import { deleteListController } from '../../../../useCases/List/deleteList';
import { getListController } from '../../../../useCases/List/getList';
import { isListExistController } from '../../../../useCases/List/isListExist';
import { nextEntryController } from '../../../../useCases/List/nextEntry';

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
    deleteListController.execute(req, res);
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

export { listRouter };
