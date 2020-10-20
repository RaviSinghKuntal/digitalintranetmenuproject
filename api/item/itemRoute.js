import express from 'express';
import itemController from './itemController';

const router = express.Router();

router.get('/', itemController.list);

router.get('/:id', itemController.get);

router.post('/additem', itemController.create);

router.put('/updateitem', itemController.update);

router.delete('/deleteitem', itemController.delete);

export default router;