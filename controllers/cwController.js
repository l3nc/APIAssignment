// The controller of Charity worker
const Cw = require('../models/cwModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCws = async (req, res) => {
  try {
    const features = new APIFeatures(Cw.find(), req.query).$sort();
    const cws = await features.query;

    res.status(200).json({
      status: 'success',
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
    await Cw.findByIdAndDelete(req.params.id, req.body);
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

exports.getCwStats = async (req, res) => {
  try {
    const stats = await Cw.aggregate([{ $sort: { name: 1 } }]);
    res.status(200).json({
      status: 'success',
      data: { stats },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
