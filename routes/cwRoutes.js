//Charity Worker Routes
const express = require('express');
const cwController = require('../controllers/cwController');
const router = express.Router();

router.route('/').get(cwController.getAllCws).post(cwController.createCw);

router
  .route('/:id')
  .get(cwController.getCw)
  .patch(cwController.updateCw)
  .delete(cwController.deleteCw);

module.exports = router;
