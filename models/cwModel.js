const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Schema config
const cwSchema = new mongoose.Schema({
  slug: String,
  name: {
    type: String,
    trim: true,
    required: [true, 'Must have a name'],
    maxlength: [50, 'Name cannot be longer than 50 characters'],
    minlength: [1, 'Name at least need to more than 1 characters'],
  },
  joinDate: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    required: [true, 'Use to Login'],
    trim: true,
    unique: [true, 'cannot register duplicate email address'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Must have a password'],
    trim: true,
    maxlength: [50, 'Password cannot be longer than 50 characters'],
    minlength: [8, 'Password at least need to more than 8 characters'],
    match: [
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      'password show contains capital and small letters',
    ],

    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'comfirm password is needed'],
    validate: {
      // Only work on create new OBJ or Save.
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password is not the SAME!!!',
    },
  },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

cwSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// only run if the password had modified
cwSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // hash 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

cwSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

cwSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

cwSchema.methods.correctPassword = async function (
  candidatePassword,
  cwPassword
) {
  return await bcrypt.compare(candidatePassword, cwPassword);
};
cwSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

cwSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Export the schema
const Cw = mongoose.model('Cw', cwSchema);
module.exports = Cw;
