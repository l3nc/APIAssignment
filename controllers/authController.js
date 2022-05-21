const Cw = require('../models/cwModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// {
//    email: req.body.email,
//    password: req.body.password,
//    passwordConfirm: req.body.passwordConfirm,
// }

exports.signup = catchAsync(async (req, res, next) => {
  const newCw = await Cw.create(req.body);

  const token = signToken(newCw._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      cw: newCw,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password exist

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // check user exist and password is correct
  const cw = await Cw.findOne({ email }).select('+password');

  if (!cw || !(await cw.correctPassword(password, cw.password))) {
    return next(new AppError('Incorrect email or password'), 401);
  }
  // if everything ok, send token to client
  const token = signToken(cw._id);

  res.status(200).json({ status: 'success', token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Getting token and check exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, Please log in to get access!', 401)
    );
  }
  //Validate token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check user exists
  const checkCw = await Cw.findById(decoded.id);
  if (!checkCw) {
    return next(
      new AppError(
        ' The member belonging to this token does no longer exist!',
        401
      )
    );
  }
  //Check user changed password after token was issue.
  if (checkCw.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'The Member recently changed password! please log in again!',
        401
      )
    );
  }
  // grant access to protected route
  req.cw = checkCw;
  next();
});

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    //role : admin
    if (!role.includes(req.cw.role)) {
      return next(new AppError('No permission!', 403));
    }
    next();
  };
};
