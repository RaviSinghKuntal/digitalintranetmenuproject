import express from 'express';
import menuController from './menuController';

const router = express.Router();

router.get('/', menuController.list);

router.get('/:id', menuController.get);

router.post('/addMenu', menuController.create);

router.put('/updateMenu', menuController.update);

router.delete('/deleteMenu', menuController.delete);

export default router;