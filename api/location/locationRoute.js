import express from 'express';
import locationController from './locationController';

const router = express.Router();

router.get('/', locationController.list);

router.get('/:id', locationController.get);

router.post('/addLocation', locationController.create);

router.put('/updateLocation', locationController.update);

router.delete('/deleteLocation', locationController.delete);

export default router;