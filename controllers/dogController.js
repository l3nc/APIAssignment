// The controller of DOG
const Dog = require('../models/dogModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllDogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Dog.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const dogs = await features.query;
  res.status(200).json({
    status: 'success',
    results: dogs.length,
    data: {
      dogs,
    },
  });
});

exports.getDog = catchAsync(async (req, res, next) => {
  const dog = await Dog.findById(req.params.id);
  if (!dog) {
    return next(new AppError('No Dog ID found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      dog,
    },
  });
});

exports.createDog = catchAsync(async (req, res, next) => {
  const newDog = await Dog.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      dog: newDog,
    },
  });
});

exports.updateDog = catchAsync(async (req, res, next) => {
  const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!dog) {
    return next(new AppError('No Dog ID found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      dog,
    },
  });
});

exports.deleteDog = catchAsync(async (req, res, next) => {
  const dog = await Dog.findByIdAndDelete(req.params.id, req.body);
  if (!dog) {
    return next(new AppError('No Dog ID found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getDogStats = catchAsync(async (req, res, next) => {
  const stats = await Dog.aggregate([{ $sort: { name: 1 } }]);
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
