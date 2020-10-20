import express from 'express';
import userController from './userController';

const router = express.Router();

router.get('/', userController.list);

router.get('/:id', userController.get);

router.post('/addUser', userController.create);

router.put('/updateUser', userController.update);

router.delete('/deleteUser', userController.delete);

export default router;