'use strict';

// The controller of Charity worker
const fs = require('fs');

exports.getAllDogs = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Done',
  });
};

exports.getDogs = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Done',
  });
};
exports.createDogs = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Done',
  });
};
exports.updateDogs = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Done',
  });
};
exports.deleteDogs = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'Done',
  });
};
