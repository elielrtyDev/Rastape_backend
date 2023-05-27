// import crypto from 'crypto';
import multer, { Options } from 'multer';
import path from 'path';

import AppError from '@shared/errors/AppError';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;
  uploadsFolder: string;

  multer: Options;

  config: {
    disk: Record<string, unknown>;
    aws: {
      bucket_url: string;
    };
  };
}

export default {
  driver: process.env.STORAGE || 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        // const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 50, // 50 MB
    },
    fileFilter: (request, file, callback) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        callback(null, true);
      } else {
        callback(null, false);
        callback(new AppError('Tipo de documento inválido!'));
      }
    },
  },

  config: {
    disk: {},
    aws: {
      bucket_url: process.env.AWS_BUCKET_URL,
    },
  },
} as IUploadConfig;
