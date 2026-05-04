import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

export const storageOptions: StorageEngine = multer.diskStorage({
  filename(req: Request, file: Express.Multer.File, callBack: (error: (Error | null), filename: string) => void) {
    if (file.mimetype.startsWith('image')) {
      let extension = file.mimetype.endsWith('jpeg') ? 'jpeg' : 'png';
      let fileName = 'image_' + Date.now() + '.' + extension;
      return callBack(null, fileName);
    }

    callBack(new Error('Wrong file format'), '');

  },

  destination: './uploads',
});