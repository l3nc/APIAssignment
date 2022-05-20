const Cws = require('./../models/cwModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newCw = await Cws.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      cw: newCw,
    },
  });
});
