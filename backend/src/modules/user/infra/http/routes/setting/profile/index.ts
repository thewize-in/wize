import express, { Request, Response } from 'express';
import { authorizationMiddleware } from '../../../../../../../shared/infra/http/middlewares';
import { getUserProfileController } from '../../../../../useCases/getUserProfile';

const userProfileRouter = express.Router();

userProfileRouter.get('/', authorizationMiddleware.ensureAuthenticated(), (req: Request, res: Response) => {
    getUserProfileController.execute(req, res);
});
export { userProfileRouter };
