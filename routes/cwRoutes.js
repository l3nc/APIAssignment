//Charity Worker Routes
const express = require('express');
const cwController = require('../controllers/cwController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/forgotPassword', authController.forgotPassword);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').get(cwController.getAllCws);
router.route('/cw-stats').get(cwController.getCwStats);
router.route('/').post(cwController.createCw);
router
  .route('/:id')
  .get(cwController.getCw)
  .patch(cwController.updateCw)
  .delete(cwController.deleteCw);

module.exports = router;
