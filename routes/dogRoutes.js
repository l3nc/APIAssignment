//Dog Routes
const express = require('express');

const dogController = require('../controllers/dogController');

const router = express.Router();

router.route('/').get(dogController.getAllDogs).post(dogController.createDog);

router.route('/dog-stats').get(dogController.getDogStats);

router
  .route('/:id')
  .get(dogController.getDog)
  .patch(dogController.updateDog)
  .delete(dogController.deleteDog);

module.exports = router;
