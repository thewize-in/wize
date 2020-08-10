import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../../../shared/infra/http/middlewares';
import { deleteUserAccountController } from '../../../../../useCases/deleteUserAccount';

const userAccountRouter = express.Router();

userAccountRouter.post(
    '/delete',
    authorizationMiddleware.ensureAuthenticated(),
    authorizationMiddleware.ensureUserIsPatient(),
    (req: Request, res: Response) => {
        deleteUserAccountController.execute(req, res);
    },
);
export { userAccountRouter };
