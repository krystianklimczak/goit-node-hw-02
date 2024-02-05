import multer from 'multer';
import path from 'path';
import Jimp from 'jimp';
import fs from 'fs/promises';
import { storage, storeImage } from '../multerConfig/multerConfig.js';

const extensionWhiteList = ['.jpg', '.jpge', '.png', '.gif'];
const mimetypeWhiteList = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const AVATARS_WIDTH = 256;
const AVATARS_HEIGHT = 256;

const uploadAvatarMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (!extensionWhiteList.includes(extension) || !mimetypeWhiteList.includes(mimetype)) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const checkImageAndTransform = async sourcePath =>
  new Promise(resolve => {
    Jimp.read(sourcePath, async (err, image) => {
      if (err) resolve(false);

      const newPath = path.join(storeImage, path.basename(sourcePath));

      try {
        const w = image.getWidth();
        const h = image.getHeight();

        const cropWidth = w > AVATARS_WIDTH ? AVATARS_WIDTH : w;
        const cropHeight = h > AVATARS_HEIGHT ? AVATARS_HEIGHT : h;

        const centerX = Math.round(w / 2 - cropWidth / 2);
        const centerY = Math.round(h / 2 - cropHeight / 2);

        await image
          .rotate(360)
          .crop(centerX < 0 ? 0 : centerX, centerY < 0 ? 0 : centerY, cropWidth, cropHeight)
          .write(sourcePath);

        await fs.rename(sourcePath, newPath);

        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });
  });

export { uploadAvatarMiddleware, checkImageAndTransform };
