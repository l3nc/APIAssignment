'use strict';

// The controller of Charity worker
const fs = require('fs');

const dogs = JSON.parse(fs.readFileSync(`${__dirname}/../test.json`));

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > dogs.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

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
  const newId = dogs[dogs.length - 1].id + 1;
  const newDog = Object.assign({ id: newId }, req.body);
  dogs.push(newDog);
  fs.writeFile(`${__dirname}/../test.json`, JSON.stringify(dogs), (err) => {
    res.status(201).json({ status: 'Success', data: { dog: newDog } });
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
