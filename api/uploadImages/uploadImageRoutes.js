import express from 'express';
import uploadImageController from './uploadImageController';
import multer from 'multer';
import path from 'path';
const router = express.Router();

// const upload = multer({ dest: 'uploadImages' });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log({ req, file });
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // console.log({ response_mila: req, file_ka_naam: file });
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

router.get('/:filename', uploadImageController.getImage);

router.post('/', multer({ storage: storage}).single('file'), uploadImageController.upload);


export default router;