import { isString, result } from "lodash";
import admin from './adminModel';
import digitalIntranetQueryGenerator from "../../util/digitalIntranetQueryGenerator";
import { successHandler, errorHandler } from "../../util/responseHandler";
import bcrypt from 'bcrypt';

export const orderQueryGenerator = digitalIntranetQueryGenerator(
  admin,
);

export default {
  addUser: (req, res) => {
    console.log('ADD USER CALLLEDS');
    console.log({ req: req.body });
    const { body } = req;
    if(!isString(body)) {
      JSON.stringify(body);
    }
    const saltRounds = 10;
    bcrypt.hash(body.password, saltRounds, (err, hash) => {
      console.log({ hash });
      body.password = hash;
      orderQueryGenerator
      .create(body)
      .then((result) => {
        successHandler(res, result);
      }).catch((err) => {
        console.log({ err });
        errorHandler(res, err);
      })
    })
  },

  login: (req, res) => {
    console.log('LOGIN CALLLEDS');
    const { body } = req;
    console.log({ body });
    if(!isString(body)) {
      JSON.stringify(body);
    }
    const params = {
      query: {
        name: body.name,
      }
    }
    orderQueryGenerator
    .list(params)
    .then((result) => {
      result = result[0];
      console.log({ result });
      console.log({ bodyPass: body.password, resultPass: result.password });
      bcrypt.compare(body.password, result.password, (err, response) => {
        if(err) {
          console.log({ err });
        }
         if(body.name === result.name && response === true) {
           successHandler(res, "User Successfully Logged In!!");
         } else {
           errorHandler(res, "User Name Password is Incorrect!!");
         }
      });
    }).catch((err) => {
      console.log({ err });
      errorHandler(res, err);
    });
  }
}