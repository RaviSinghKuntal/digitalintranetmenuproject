import fs from 'fs';
import mongoose from 'mongoose';
import Grid from 'gridfs';
import fse from 'fs-extra';
import mongodbConfig from '../config/mongodb.config';
import { get, isArray } from 'lodash';

const { url: mongoUrl } = mongodbConfig;
let gfs;

mongoose.connect(mongoUrl);

const { connection } = mongoose;
connection.on('connected', () => {
  gfs = Grid(connection.db, mongoose.mongo);
});

export const fileSavedInDatabase = (fileData, deleteFileAfterSave = true) => {
  return new Promise((resolve, reject) => {
    if (!gfs) {
      // delete temporary files
      deleteTemporaryFile(get(fileData, 'filePath', null));
      return reject(new Error('Error in saving file in database.'));
    }
    try {
      const filePath = get(fileData, 'filePath', null);
      const filename = get(fileData, 'filename', null);
      console.log({ filePath, filename });

      if (!filename || !filePath) {
        return reject(new Error('incorrect file-info to save in db.'));
      }
      const otherOptions = get(fileData, 'options', null);
      const options = {
        filename,
        mode: 'w',
        chunkSize: 1024,
        metadata: {
          contentType: 'image/*',
        },
        ...otherOptions,
      };
      console.log("writestream >>>>>>>>>>>>>>>>>>>>>", { options });
      const writestream = gfs.createWriteStream(options);
      console.log("writestream >>>>>>>>>>>>>>>>>>>>>");
      fs.createReadStream(filePath).pipe(writestream);
      // After write file on the given path
      writestream.on('close', (file) => {
        deleteFileAfterSave && deleteTemporaryFile(filePath);
        return resolve(file);
      });
    } catch (err) {
      console.error('Error in saveFileInDB', err);
      return reject(new Error('Error in trying to save file in database.'));
    }
  });
};

export const deleteTemporaryFile = (filePath) => {
  try {
    if (isArray(filePath)) {
      forEach(filePath, (path) => {
        path && fse.removeSync(path);
      });
    } else {
      filePath && fse.removeSync(filePath);
    }
  } catch (err) {
    console.error('Error in deleting temporary file - ', err);
  }
};

export const getFileData = (fileId) => {
  return new Promise((resolve, reject) => {
    if (!gfs) {
      return reject(new InternalError('Error in getting file data from database.'));
    }
    try {
      const options = { _id: fileId };
      // fetch file from the db according to the request parameters
      return gfs.findOne(options, (err, file) => {
        if (err) {
          return reject(err);
        }
        return resolve(file);
      });
    } catch (err) {
      return reject(new InternalError('Error in try getting file data from database.'));
    }
  });
};