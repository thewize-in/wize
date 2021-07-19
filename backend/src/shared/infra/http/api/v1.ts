import express from 'express';
import { authRouter } from '../../../../modules/user/infra/http/routes/auth';
import { userRouter } from '../../../../modules/user/infra/http/routes';
import { listRouter } from '../../../../modules/entrymanagement/infra/http/routes/list';
import { doctorRouter } from '../../../../modules/doctor/infra/http/routes';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/list', listRouter);
v1Router.use('/', userRouter);
v1Router.use('/doctor', doctorRouter);

export { v1Router };
