import fs from 'fs';
import { getExtension, getType } from 'mime';
import path from 'path';

import uploadConfig from '@config/upload';

import ISaveFileDTO from '../dtos/ISaveFileDTO';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({
    id,
    name,
    file,
    folder,
  }: ISaveFileDTO): Promise<string> {
    const type = getType(file.replace(/\s/g, ''));
    const fileExtension = getExtension(type!);
    const fileName = `${id}-${name.replace(/\s/g, '-')}.${fileExtension}`;

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, folder, fileName),
    );

    return fileName;
  }

  public async deleteFile(file: string, folder: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
