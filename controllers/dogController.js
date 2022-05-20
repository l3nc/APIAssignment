// The controller of DOG
const Dog = require('../models/dogModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllDogs = async (req, res) => {
  try {
    const features = new APIFeatures(Dog.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const dog = await features.query;

    res.status(200).json({
      status: 'success',
      results: dog.length,
      data: {
        dog,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        dog,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createDog = async (req, res) => {
  try {
    const newDog = await Dog.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        dog: newDog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        dog,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteDog = async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id, req.body);
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

exports.getDogStats = async (req, res) => {
  try {
    const stats = await Dog.aggregate([{ $sort: { name: 1 } }]);
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
