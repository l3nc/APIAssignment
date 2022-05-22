//Dog Routes
const express = require('express');
const authController = require('../controllers/authController');
const dogController = require('../controllers/dogController');

const router = express.Router();
router.route('/').get(dogController.getAllDogs);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/:adpotion').post(dogController.adoptDog);
router.route('/').post(dogController.createDog);
router.route('/dog-stats').get(dogController.getDogStats);

router
  .route('/:id')
  .get(dogController.getDog)
  .patch(dogController.updateDog)
  .delete(dogController.deleteDog);

module.exports = router;
