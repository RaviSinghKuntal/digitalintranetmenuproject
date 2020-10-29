import { successHandler, errorHandler } from "../../util/responseHandler";
import { get, isEmpty } from "lodash";
import Grid from 'gridfs';
import { fileSavedInDatabase } from "../../helpers/common";
// const { url: mongoUrl } = mongodbConfig;

// mongoose.connect(mongoUrl);

let gfs;
const { connection } = mongoose;
connection.on('connected', () => {
  gfs = Grid(connection.db, mongoose.mongo);
});

export default {

  getImage: (req, res) => {
    var readstream = gfs.createReadStream({filename: req.params.filename}); 
    readstream.on("error", function(err){
        res.send("No image found with that title"); 
    });
    readstream.pipe(res);
  },
  upload: (req, res) => {
    try {
      console.log({ res: req.file });
      const file = get(req, 'file', {});
      // Check if file is empty
      if (!isEmpty(file)) {
        const filePath = get(file, 'path', null);
        const filename = get(file, 'filename', '');
        const filedata = {
          filename,
          filePath,
        };
        // Save the file in the DB
        fileSavedInDatabase(filedata)
        .then((savedFileInfo) => {
          console.log({ savedFileInfo });
          // Get the saved file information after save
          const fileInfo = {
            originalName: get(file, 'originalname', ''),
            key: get(savedFileInfo, '_id', ''),
            filename: get(file, 'filename', ''),
          };
          // Return the file information to client
          console.log({ fileInfo });
          successHandler(res, fileInfo);
        })
        .catch((err) => {
          errorHandler(res, `File upload failed: ${err}`);
        });
      }
    } catch(err) {
      console.error({ err });
    }
      }
}