import express from 'express';
import modifiersController from './modifiersController';

const router = express.Router();

router.get('/', modifiersController.list);

router.get('/:id', modifiersController.get);

router.post('/addModifiers', modifiersController.create);

router.put('/updateModifiers', modifiersController.update);

router.delete('/deleteModifiers', modifiersController.delete);

export default router;