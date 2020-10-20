import express from 'express';
import signupController from './signupController';

const router = express.Router();

router.post('/addUser', signupController.addUser);

router.post('/', signupController.login);

export default router;