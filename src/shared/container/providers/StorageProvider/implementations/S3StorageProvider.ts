import { S3 } from '@aws-sdk/client-s3';
import upload from '@config/upload';
import fs from 'fs';
import mime, { getExtension, getType } from 'mime';
import path from 'path';

import ISaveFileDTO from '../dtos/ISaveFileDTO';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  public async saveFile({
    id,
    name,
    file,
    folder,
  }: ISaveFileDTO): Promise<string> {
    const type = getType(file.replace(/\s/g, ''));
    const fileExtension = getExtension(type!);
    const fileName = `${id}-${name.replace(/\s/g, '-')}.${fileExtension}`;

    const filePath = path.resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(filePath);

    const ContentType = String(mime.getType(filePath));

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${folder}/${fileName}`,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    });

    await fs.promises.unlink(filePath);

    return fileName;
  }

  public async deleteFile(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: `${folder}/${File}`,
    });
  }
}

export default S3StorageProvider;
