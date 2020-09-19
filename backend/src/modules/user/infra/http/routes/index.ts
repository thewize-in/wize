import express from 'express';
import { userProfileRouter } from './profile';
import { userSettingRouter } from './setting';

const userRouter = express.Router();

userRouter.use('/setting', userSettingRouter);
userRouter.use('/profile', userProfileRouter);

export { userRouter };
