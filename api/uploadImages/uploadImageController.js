import { successHandler, errorHandler } from "../../util/responseHandler";

export default {
    list: (req, res) => {
      console.log('Inside list');
      let params = get(req, 'query.params', null);
      if (isString(params)) {
        params = JSON.parse(params);
      }
      let projection = get(params, 'projection');
      set(req, 'query.params', params);
      params = get(req, 'query.params', {});
      categoryQueryGenerator
        .list(params)
        .then((result) => {
          successHandler(res, result);
        })
        .catch((err) => {
          errorHandler(res, `Error when getting records`);
        });
    },  

  upload: (req, res) => {
    try {
      // const upload = multer({ dest: 'uploadImages' });
      // console.log({ request: path.join(__dirname, '../../uploads') });
      // express().use('/uploads', express.static(path.join(__dirname, '../uploads')));
      console.log({ res: req.file, path: req.file.path });
      const status = 201;
      successHandler(res, 'File uploaded successfully!!', status);
      } catch(err) {
      errorHandler(res, `File upload failed: ${err}`);
    }
  }
}