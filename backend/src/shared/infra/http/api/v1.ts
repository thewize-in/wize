import express from 'express';
import { authRouter } from '../../../../modules/user/infra/http/routes/auth';
import { userRouter } from '../../../../modules/user/infra/http/routes';
import { entrybookRouter } from '../../../../modules/entrymanagement/infra/http/routes/entrybook';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/entrybook', entrybookRouter);
v1Router.use('/', userRouter);

export { v1Router };
