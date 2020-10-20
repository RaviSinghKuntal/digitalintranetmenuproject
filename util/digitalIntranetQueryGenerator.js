import { get, isString, isEmpty } from 'lodash';

export default function (MODEL) {
  return {
    list: (params = null, populate = null) => {
      if (params && isString(params)) {
        params = JSON.parse(params);
      }
      const query = get(params, 'query', {});
      const projection = get(params, 'projection', {});
      const options = get(params, 'options', {});
      const populateFromQueryParams = get(params, 'populate', null);

      if (populateFromQueryParams && isObject(populateFromQueryParams)) {
        populate = populateFromQueryParams;
      }
      let MONGOOSE_QUERY = MODEL.find(query, projection, options);

      if (populate && !isEmpty(populate)) {
        MONGOOSE_QUERY = MONGOOSE_QUERY.populate(populate);
      }
      return MONGOOSE_QUERY;
    },

    get: (params, populate = null) => {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        const id = get(params, 'id');
        const projection = get(params, 'projection', {});
        let query = get(params, 'query', { _id: '' });
        query = id ? { _id: id } : query;
        // fetch data from the specified model according to the request parameters
        let MONGOOSE_QUERY = MODEL.findOne(query, projection);

        if (populate && !isEmpty(populate)) {
          // populate the data
          MONGOOSE_QUERY = MONGOOSE_QUERY.populate(populate);
        }

        return resolve(MONGOOSE_QUERY);
      });
    },

    create: (bodyParams /* user */) => {
      return new Promise((resolve, reject) => {
        if (isString(bodyParams)) {
          bodyParams = JSON.parse(bodyParams);
        }
        if (isEmpty(bodyParams)) {
          const error = 'Fields are missing';
          return reject(error);
        }
        // bodyParams._created_by = get(user, '_id');
        resolve(MODEL.create(bodyParams));
      });
    },

    update: (body /* user */) => {
      try {
        return new Promise((resolve, reject) => {
          if (isString(body)) {
            body = JSON.parse(body);
          }
          if (isEmpty(body)) {
            const error = 'Some Fields are missing';
            return reject(error);
          }
          const query = get(body, 'query', {});
          const options = get(body, 'options', {});
          let updation = get(body, 'updation', {});
          if (
            !updation.hasOwnProperty('$set')
            && !updation.hasOwnProperty('$addToSet')
            && !updation.hasOwnProperty('$push')
            && !updation.hasOwnProperty('$pull')
            && !updation.hasOwnProperty('$inc')
            && !updation.hasOwnProperty('$dec')
            && !updation.hasOwnProperty('$unset')
            ) {
              updation = { $set: updation };
            }
            // set(updation, '$set._updated_by', get(user, '_id'));
            resolve(MODEL.update(query, updation, options));
        });
      } catch(err) {
        console.log({ err });
      }
    },

    delete: (params) => {
      try {
        return new Promise((resolve, reject) => {
          if (isString(params)) {
            params = JSON.parse(params);
          }
          if (isEmpty(params)) {
            const error = 'Some required fields are missing';
            return reject(error);
          }
          const query = get(params, 'query', {});
          if (isEmpty(query)) {
            const error = 'Required query fields are missing.';
            return reject(error);
          }
          resolve(MODEL.remove(query));
        });
      } catch(err) {
        console.log(err);
      }
    }
  }
}