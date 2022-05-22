// The controller of Charity worker
const Cw = require('../models/cwModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Get all charity worker
exports.getAllCws = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Cw.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const cws = await features.query;
  res.status(200).json({
    status: 'success',
    results: cws.length,
    data: {
      cws,
    },
  });
});

//Get single charity worker

exports.getCw = catchAsync(async (req, res, next) => {
  const cw = await Cw.findById(req.params.id);
  if (!cw) {
    return next(new AppError('No User ID found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      cw,
    },
  });
});

//Create charity worker

exports.createCw = catchAsync(async (req, res, next) => {
  const newCw = await Cw.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      cw: newCw,
    },
  });
});

//Update charity worker

exports.updateCw = catchAsync(async (req, res, next) => {
  const cw = await Cw.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!cw) {
    return next(new AppError('No User ID found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      cw,
    },
  });
});

// Delete charity worker
exports.deleteCw = catchAsync(async (req, res, next) => {
  const cw = await Cw.findByIdAndDelete(req.params.id, req.body);
  if (!cw) {
    return next(new AppError('No User ID found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Get charity worker by sorting the name
exports.getCwStats = catchAsync(async (req, res, next) => {
  const stats = await Cw.aggregate([{ $sort: { name: 1 } }]);
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
