//Charity Worker Routes
'use strict'
const fs = require('fs');
const express = require('express');
const router = express.Router();

const getAllDogs = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Done',
  });
};

const getDogs = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Done',
  });
};
const createDogs = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Done',
  });
};
const updateDogs = (req, res) => {
   res.status(200).json({
    status: 'success',
    message: 'Done',
  });
};
const deleteDogs = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'Done',
  });
};

const cwRouter = express.Router();

cwRouter
  .route('/')
  .get(getAllDogs)
  .post(createDogs);

cwRouter
  .route('/:id')
  .get(getDogs)
  .patch(updateDogs)
  .delete(deleteDogs);

module.exports = router;