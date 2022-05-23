/**
 * import or define files or package
 */
const Dog = require('../models/dogModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');

/** upload single image function for dogPic
 *using multer middleware and save to database
 * (still debugging)
 */
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadDogsImage = upload.single('dogPic');

/** adpot dog function
 * use to show wheter adpoted the dog
 * (still developing)
 */
exports.adoptDog = catchAsync(async (req, res, next) => {
  const adoptDogs = await Dog.create(req.body);
  if (!adoptDogs.isAdopt) {
    return next(new AppError('Dog had adopted by other people!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      adoptDogs,
    },
  });
});

/**get all dogs function */
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

/**get single dogs function */
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

/** create all dogs function */
exports.createDog = catchAsync(async (req, res, next) => {
  const newDog = await Dog.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      dog: newDog,
    },
  });
});

/** update all dogs function */
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

/**delete all dogs function */
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

/** get all dogs by using sort function */
exports.getDogStats = catchAsync(async (req, res, next) => {
  const stats = await Dog.aggregate([{ $sort: { name: 1 } }]);
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
