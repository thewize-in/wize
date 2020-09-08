import express from 'express';
import { doctorRouter } from '../../../../modules/queue/infra/http/routes';
import { authRouter } from '../../../../modules/user/infra/http/routes/auth';
import { userRouter } from '../../../../modules/user/infra/http/routes';
import { patientEntrybookRouter } from '../../../../modules/queue/infra/http/routes/patiententrybook';

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/dr', doctorRouter);
v1Router.use('/patiententrybook', patientEntrybookRouter);
v1Router.use('/', userRouter);

export { v1Router };
