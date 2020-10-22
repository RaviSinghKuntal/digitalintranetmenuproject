import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import menu from './api/menu/menuRoute';
import category from './api/category/categoryRoute';
import item from './api/item/itemRoute';
import modifiers from './api/modifiers/modifiersRoute';
import user from './api/user/userRoute';
import location from './api/location/locationRoute';
import order from './api/order/orderRoute';
import mongoose from "mongoose";
import { url } from './config/mongodb.config';
import bodyParser from "body-parser";
import signup from './api/signup/signup';
import login from './api/signup/signup';
import upload from './api/uploadImages/uploadImageRoutes';

const app = express();
const port = 3000;
app.use(bodyParser({
  urlEncoded:true
}))
console.log({ url });

app.use(cors());
app.use('/signup', signup);
app.use('/login', login);
app.use('/menu', menu);
app.use('/category', category);
app.use('/item', item);
app.use('/modifiers', modifiers);
app.use('/user', user);
app.use('/location', location);
app.use('/order', order);
app.use('/upload', upload);

// mongoose.connect(url);

mongoose.connect(url);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log({ req, file });
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log({ response_mila: req, file_ka_naam: file });
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

multer({ storage: storage}).single('image')

app.listen(port, () => console.log(`Digital intranet Menu App listening at http://localhost:${port}`));