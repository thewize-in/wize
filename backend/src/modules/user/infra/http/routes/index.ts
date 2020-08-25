import express, { Request, Response } from 'express';
import { userLoginController, userLoginRequestController } from '../../../useCases/loginWithGoogle/index';
import { logoutUserController } from '../../../useCases/logout';
import { userSettingRouter } from './setting';

const userRouter = express.Router();

userRouter.get('/login', (req: Request, res: Response) => {
    userLoginRequestController.execute(req, res);
});

userRouter.get('/oauth2/google/callback', (req: Request, res: Response) => {
    userLoginController.execute(req, res);
});

userRouter.get('/logout', (req: Request, res: Response) => logoutUserController.execute(req, res));

userRouter.use('/setting', userSettingRouter);

export { userRouter };
