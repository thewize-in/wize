import express, { Request, Response } from 'express';
import { userLoginController } from '../../../useCases/loginWithGoogle/index';
import { getUserByUsernameController } from '../../../useCases/getUserByUsername';
import { logoutUserController } from '../../../useCases/logout';
import { userSettingRouter } from './setting';

const userRouter = express.Router();

userRouter.post('/login', (req: Request, res: Response) => {
    return userLoginController.execute(req, res);
});

userRouter.post('/logout', (req: Request, res: Response) => logoutUserController.execute(req, res));

userRouter.get('/:username', (req: Request, res: Response) => getUserByUsernameController.execute(req, res));

userRouter.use('/setting', userSettingRouter);

export { userRouter };
