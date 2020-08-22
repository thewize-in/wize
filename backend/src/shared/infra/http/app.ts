import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';
import redisConnect from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import { userRouter } from '../../../modules/user/infra/http/routes/index';
import { startDatabase } from '../database/mongoose/config/config';
import { authConfig } from '../../config/authConfig';
import { redisSessionClient } from '../../services/caching/session/redisSessionClient';
import { doctorRouter } from '../../../modules/queue/infra/http/routes';

const origin = {
    origin: ['http://localhost:5500', 'http://localhost:3000'],
    credentials: true,
};
const app = express();
const redisStore = redisConnect(session);

startDatabase(authConfig.databaseConnectionUrl);

app.use(
    session({
        store: new redisStore({
            host: authConfig.redisServerUrl,
            port: authConfig.redisServerPort,
            client: redisSessionClient,
            ttl: authConfig.sessionExpiryTime,
        }),
        secret: authConfig.sessionSecret,
        resave: false,
        saveUninitialized: false,
        name: 'user',
        rolling: false,
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: authConfig.sessionExpiryTime,
            secure: false, // set true for https
        },
    }),
);

app.use(cors(origin));
app.use(compression());
app.use(helmet());
// app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);
app.use(doctorRouter);

app.listen(3000, () => {
    console.log('server started:.:.:.');
});

export { app };
