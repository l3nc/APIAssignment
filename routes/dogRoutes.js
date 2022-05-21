//Dog Routes
const express = require('express');
const authController = require('../controllers/authController');
const dogController = require('../controllers/dogController');

const router = express.Router();

router.route(
  '/:adpotion',
  authController.protect,
  authController.restrictTo('member'),
  dogController.adoptDog
);

router
  .route('/')
  .get(dogController.getAllDogs)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    dogController.createDog
  );

router.route('/dog-stats').get(dogController.getDogStats);

router
  .route('/:id')
  .get(dogController.getDog)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    dogController.updateDog
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    dogController.deleteDog
  );

module.exports = router;

//authController.protect,
//authController.restrictTo('admin'),
