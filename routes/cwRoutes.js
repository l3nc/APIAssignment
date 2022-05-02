//Charity Worker Routes
'use strict';
const express = require('express');
const cwController = require('./../controllers/cwController');
const router = express.Router();

router.route('/').get(cwController.getAllDogs).post(cwController.createDogs);

router
  .route('/:id')
  .get(cwController.getDogs)
  .patch(cwController.updateDogs)
  .delete(cwController.deleteDogs);

module.exports = router;
