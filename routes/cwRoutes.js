//Charity Worker Routes
const express = require('express');
const cwController = require('../controllers/cwController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(cwController.getAllCws)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    cwController.createCw
  );
router.route('/cw-stats').get(cwController.getCwStats);
router
  .route('/:id')
  .get(cwController.getCw)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    cwController.updateCw
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    cwController.deleteCw
  );

module.exports = router;

//authController.protect,
//authController.restrictTo('admin'),
