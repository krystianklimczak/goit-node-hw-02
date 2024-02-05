import path from 'path';
import multer from 'multer';
import { uuid } from 'uuidv4';

const uploadDir = path.join(process.cwd(), 'tmp');
const storeImage = path.join(process.cwd(), 'public/avatars');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}${file.originalname}`);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

export { upload, uploadDir, storeImage, storage };
