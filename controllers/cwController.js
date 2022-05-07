// The controller of Charity worker
const res = require('express/lib/response');
const Cw = require('../models/cwModel');

exports.getAllCws = async (req, res) => {
  try {
    const cws = await Cw.find();
    res.status(200).json({
      status: 'sucess',
      results: cws.length,
      data: {
        cws,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCw = async (req, res) => {
  try {
    const cw = await Cw.findById(req.params.id);
    res.status(200).json({
      status: 'sucess',
      data: {
        cw,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCw = async (req, res) => {
  try {
    const newCw = await Cw.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        cw: newCw,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCw = async (req, res) => {
  try {
    const cw = await Cw.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        cw,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCw = async (req, res) => {
  try {
    await Cw.findbyIDAndDelete(req.params.id, req.body);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
