import express from 'express';
import bodyParser from 'body-parser';
import redisConnect from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import { startDatabase } from '../database/mongoose/config/config';
import { authConfig } from '../../config/authConfig';
import { redisSessionClient } from '../../services/caching/session/redisSessionClient';
import { v1Router } from './api/v1';

const origin = {
  origin: ['http://thewize.in'],
  credentials: true,
};
const port = authConfig.port;
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
    secret: `${authConfig.sessionSecret}`,
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
  })
);

app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../../../../frontend/dist/')));

app.use('/api/v1', v1Router);

app.get('/googlea3183e0e0aa8438d.html', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../../../../../frontend/dist/googlea3183e0e0aa8438d.html'
    )
  );
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../../../frontend/dist/index.html'));
});
// Handle 500
app.use(function (error, req, res, next) {
  res.redirect('/servererror');
});

app.listen(port, () => {
  console.log(`server started at.:.:.:`);
});

export { app };
