import express from 'express';
import orderController from './orderController';

const router = express.Router();

router.get('/', orderController.list);

router.get('/:id', orderController.get);

router.post('/addOrder', orderController.create);

router.put('/updateOrder', orderController.update);

router.delete('/deleteOrder', orderController.delete);

export default router;