import express from "express";
import uploadImageController from "./uploadImageController";
import multer from "multer";
import path from "path";
const router = express.Router();

// const upload = multer({ dest: 'uploadImages' });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

router.get("/:id", uploadImageController.getImage);

router.post(
  "/",
  multer({ storage: storage }).single("file"),
  uploadImageController.upload
);

export default router;
