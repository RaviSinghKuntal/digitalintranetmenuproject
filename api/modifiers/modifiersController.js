import modifiersModel from './modifiersModel';
import digitalIntranetQueryGenerator from '../../util/digitalIntranetQueryGenerator';
import { get, isString, set } from 'lodash';
import { successHandler, errorHandler } from '../../util/responseHandler';

export const modifiersQueryGenerator = digitalIntranetQueryGenerator(
  modifiersModel,
);

export default {
  list: (req, res) => {
    console.log('Inside list ...........');
    let params = get(req, 'query.params', null);
    if (isString(params)) {
      params = JSON.parse(params);
    }
    // let projection = get(params, 'projection');
    set(req, 'query.params', params);
    params = get(req, 'query.params', {});
    modifiersQueryGenerator
      .list(params)
      .then((result) => {
        successHandler(res, result);
      })
      .catch((err) => {
        errorHandler(res, `Error when getting records`);
      });
  },

  get: (req, res) => {
    let params = get(req, 'params', null);
    console.log({request: params, query: req.query});
    if(isString(params)) {
      params = JSON.parse(params);
    }
    modifiersQueryGenerator
    .get(params)
    .then((result) => {
      successHandler(res, result);
    })
    .catch((err) => {
      errorHandler(res, err);
    })
  },

  create: async (req, res) => {
    // const user = get(req, 'user', {});
    let bodyParams = get(req, 'body', {});
    console.log('Create Pe aa gaya!!!', bodyParams);
      if (isString(bodyParams)) {
        bodyParams = JSON.stringify(bodyParams);
      }
      modifiersQueryGenerator
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

  update: async (req, res) => {
      let body = get(req, 'body', {});
      console.log('body me aaya......', body);
      // const user = get(req, 'user', {});
      if (isString(body)) {
        body = JSON.stringify(body);
      }
      modifiersQueryGenerator
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
        modifiersQueryGenerator
        .delete({query: {_id: {$in: menuIds}}})
        .then((result) => {
          successHandler(res, {
            message,
            result,
          });
        });
    },
  }