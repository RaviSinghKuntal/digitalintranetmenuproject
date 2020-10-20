import categoryModel from './categoryModel';
import digitalIntranetQueryGenerator from '../../util/digitalIntranetQueryGenerator';
import { get, set, isString } from 'lodash';
import { successHandler, errorHandler } from '../../util/responseHandler';

export const categoryQueryGenerator = digitalIntranetQueryGenerator(categoryModel);

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

  create: async (req, res) => {
    // const user = get(req, 'user', {});
    let bodyParams = get(req, 'body', {});
    console.log('Create Pe aa gaya!!!', bodyParams);
      if (isString(bodyParams)) {
        bodyParams = JSON.stringify(bodyParams);
      }
      categoryQueryGenerator
        .create(bodyParams, /* user */)
        .then((result) => {
          successHandler(res, result);
        })
        .catch((err) => {
          errorHandler(
            res,
            err,
          );
        });
  },

  get: (req, res) => {
    let params = get(req, 'params', null);
    console.log({request: params, query: req.query});
    if(isString(params)) {
      params = JSON.parse(params);
    }
    categoryQueryGenerator
    .get(params)
    .then((result) => {
      successHandler(res, result);
    })
    .catch((err) => {
      errorHandler(res, err);
    })
  },

  update: async (req, res) => {
      let body = get(req, 'body', {});
      console.log('body me aaya......', body);
      // const user = get(req, 'user', {});
      if (isString(body)) {
        body = JSON.stringify(body);
      }
      categoryQueryGenerator
        .update(body /* user */)
        .then((result) => {
          successHandler(res, result);
        })
        .catch((err) => {
          errorHandler(
            res,
            err,
          );
        });
    },
    delete: async (req, res) => {
        console.log("Inside delete::::::::::");
        let menuIds = get(req, 'body', {});
        console.log({ menuIds });
        let deleteQuery = {};
        let message = '';
        if (isString(menuIds)) {
          menuIds = JSON.parse(menuIds);
        }
        // const menuIds = get(body, 'query', []);
        // if (isEmpty(menuIds)) {
        //   return errorHandler(res, `Please select one of given Menu.`);
        // }
        // if (menuIds.length > 0) {
        //   deleteQuery = { _id: { $in: menuIds } };
        // } else {
        //   return errorHandler(res, 'Please select a menu');
        // }
        categoryQueryGenerator
        .delete({query: {_id: {$in: menuIds}}})
        .then((result) => {
          successHandler(res, {
            message,
            result,
          });
        });
    },
}