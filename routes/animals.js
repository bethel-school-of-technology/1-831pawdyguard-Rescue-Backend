const express = require('express');

const AnimalController = require('../controllers/animals');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/multer-file');

const router = express.Router();

router.post('', checkAuth, extractFile, AnimalController.createAnimal);

router.put('/:id', checkAuth, extractFile, AnimalController.updateAnimal);

router.get('', AnimalController.getAnimals);

router.get('/:id', AnimalController.getAnimal);

router.delete('/:id', checkAuth, AnimalController.deleteAnimal);

module.exports = router;
