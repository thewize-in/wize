import express, { Request, Response } from 'express';
import {
  userLoginRequestController,
  userLoginController,
} from '../../../useCases/UserLoginWithGoogle';
import { logoutUserController } from '../../../useCases/logout';
import { authorizationMiddleware } from '../../../../../shared/infra/http/middlewares';

const authRouter = express.Router();

authRouter.get('/login', (req: Request, res: Response) => {
  userLoginRequestController.execute(req, res);
});

authRouter.get('/oauth2/google/callback', (req: Request, res: Response) => {
  userLoginController.execute(req, res);
});

authRouter.get('/logout', (req: Request, res: Response) =>
  logoutUserController.execute(req, res)
);

authRouter.get('/isLoggedIn', authorizationMiddleware.isLoggedIn());
authRouter.get('/isPatient', authorizationMiddleware.isPatient());
authRouter.get('/isDoctor', authorizationMiddleware.isDoctor());

export { authRouter };
