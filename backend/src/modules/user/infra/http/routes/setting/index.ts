import express from 'express';
import { userProfileRouter } from '../profile';

const userSettingRouter = express.Router();

userSettingRouter.use('/profile', userProfileRouter);

export { userSettingRouter };
