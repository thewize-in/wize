import express, { Request, Response } from 'express';
import { userSettingRouter } from './setting';

const userRouter = express.Router();

userRouter.use('/setting', userSettingRouter);

export { userRouter };
