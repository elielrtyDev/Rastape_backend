import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '../../container';

import { errors } from 'celebrate';
import timeout from 'connect-timeout';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
// import admin, { ServiceAccount } from 'firebase-admin';
import helmet from 'helmet';
import { MulterError } from 'multer';
import pg from 'pg';

import uploadConfig from '@config/upload';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

// import serviceAccount from '../../../../firebase.json';
import AppError from '../../errors/AppError';
import createConnection from '../typeorm';
import routes from './routes';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as ServiceAccount),
// });

pg.types.setTypeParser(1114, stringValue => new Date(`${stringValue}+0000`));

createConnection();

const app = express();
app.use(timeout('3m'));
app.use(cors());
app.use(helmet());
// app.use(rateLimiter);
app.use(express.json({ limit: '1mb' }));

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/avatars', express.static(`${uploadConfig.uploadsFolder}/avatars`));
app.use(`/api/${process.env.API_VERSION || 'v1'}`, routes);

app.use(Sentry.Handlers.errorHandler());
app.use(errors());
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return response.status(400).json({
        status: 'error',
        message:
          'Arquivo muito grande! Por favor nos envie um arquivo com tamanho máximo de 50MB.',
      });
    }

    if (err.message === 'Response timeout') {
      return response.status(400).json({
        status: 'error',
        message:
          'Tempo máximo da requisição excedido. Por favor tente novamente.',
      });
    }

    console.log(err.message);

    return response.status(500).json({
      status: 'error',
      message: `Erro interno do servidor! - ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
