import express from 'express';
import { userProfileRouter } from './profile';
import { userAccountRouter } from './account';

const userSettingRouter = express.Router();

userSettingRouter.use('/profile', userProfileRouter);
userSettingRouter.use('/account', userAccountRouter);

export { userSettingRouter };
