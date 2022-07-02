/**
 * //Dog Routes
 */
const express = require('express');
const { route } = require('../app');
const authController = require('../controllers/authController');
const dogController = require('../controllers/dogController');

const router = express.Router();

router.route('/').get(dogController.getAllDogs);

/**
 * // Protect all routes after this middleware
 */

// router.use(authController.protect);
// router.use(authController.restrictTo('admin'));

router.patch('/photo', dogController.uploadDogsImage);
router.route('/:adpotion').post(dogController.adoptDog);
router.route('/').post(dogController.createDog);
router.route('/dog-stats').get(dogController.getDogStats);

router
  .route('/:id')
  .get(dogController.getDog)
  .patch(dogController.updateDog)
  .delete(dogController.deleteDog);

module.exports = router;
