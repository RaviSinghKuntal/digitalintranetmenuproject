import express from 'express';
import categoryController from './categoryController';

const router = express.Router();

router.get('/', categoryController.list);

router.get('/:id', categoryController.get);

router.post('/addCategory', categoryController.create);

router.put('/updateCategory', categoryController.update);

router.delete('/deleteCategory', categoryController.delete);

export default router;

