const Cw = require('../models/cwModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const { promisify } = require('util');
const req = require('express/lib/request');
const { appendFile } = require('fs');
const { cwd } = require('process');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

// Creating JWT Token
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

const createSendToken = (cw, statusCode, res) => {
  const token = signToken(cw._id);

  // Cookies handlling
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  cw.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      cw: cw,
    },
  });
};
// SIGNUP function
exports.signup = catchAsync(async (req, res, next) => {
  const newCw = await Cw.create(req.body);
  createSendToken(newCw, 201, res);
});

//LOGIN function
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
  createSendToken(cw, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// Protecting the route for unauthorize access
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

// Applied access right / restrict to admin
exports.restrictTo = (...role) => {
  return (req, res, next) => {
    //role : admin
    if (!role.includes(req.cw.role)) {
      return next(new AppError('No permission!', 403));
    }
    next();
  };
};

//Forgot password function
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //get user base on posted email
  const cw = await Cw.findOne({ email: req.body.email });
  if (!cw) {
    return next(new AppError('No users with the email address', 404));
  }
  // generate the random reset token
  const resetToken = cw.createPasswordResetToken();
  await cw.save({ validateBeforeSave: false });

  // send to user email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/cws/resetPassword/${resetToken}`;
  const message = `Forgot your password?  your new password and passwordConfirm to: ${resetURL}.\nPlease ignore this email if you dont attempt to reset!`;

  try {
    await sendEmail({
      email: cw.email,
      subject: ' Password reset  (valid only 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Email Sent!',
    });
  } catch (err) {
    cw.passwordResetToken = undefined;
    cw.passwordResetExpires = undefined;
    await cw.save({ validateBeforeSave: false });

    return next(new AppError('Error!! Try again later!'), 500);
  }
});

//Reset Password function
exports.resetPassword = catchAsync(async (req, res, next) => {
  //  Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const cw = await Cw.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //  set  new password if token has not expired user exist
  if (!cw) {
    return next(new AppError('Token is invalid or expired!!', 400));
  }
  cw.password = req.body.password;
  cw.passwordConfirm = req.body.passwordConfirm;
  cw.passwordResetToken = undefined;
  cw.passwordResetExpires = undefined;
  await cw.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(cw, 201, res);
});

// Member reset password instead of forgot password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get user
  const cw = await Cw.findById(req.cw.id).select('+password');
  // check if POSTed current password is correct
  if (!(await cw.correctPassword(req.body.passwordCurrent, cw.password))) {
    return next(new AppError('Your current password is incorrect!!'));
  }
  //update password
  cw.password = req.body.password;
  cw.passwordConfirm = req.body.passwordConfirm;
  await cw.save();
  //log user
  createSendToken(cw, 200, res);
});
