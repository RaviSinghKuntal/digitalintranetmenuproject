import {
  set, unset, get, keys,
} from 'lodash';

export const errorHandler = function (res, error) {
  const errorName = get(error, 'name', '');
  // check if error is validation error
  if (errorName === 'ValidationError') {
    const errors = get(error, 'errors', {});
    const errorKeys = keys(errors);
    const errorObj = get(errors, `${get(errorKeys, '[0]')}`);
    const message = get(errorObj, 'message');
    set(error, 'message', message);
    unset(error, 'errors');
  }
  return res.status(get(error, 'status', 500)).json(error);
};

export const successHandler = function (res, data, status = 200) {
  return res.status(status).json(data);
};
