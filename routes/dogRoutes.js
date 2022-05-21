//Dog Routes
const express = require('express');
const authController = require('../controllers/authController');
const dogController = require('../controllers/dogController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, dogController.getAllDogs)
  .post(dogController.createDog);

router.route('/dog-stats').get(dogController.getDogStats);

router
  .route('/:id')
  .get(dogController.getDog)
  .patch(authController.protect, dogController.updateDog)
  .delete(authController.protect, dogController.deleteDog);

module.exports = router;

//authController.protect,
