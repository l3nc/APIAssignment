const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Schema config
const cwSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Must have a name'],
    maxlength: [50, 'Name cannot be longer than 50 characters'],
    minlength: [1, 'Name at least need to more than 1 characters'],
  },
  slug: String,
  joinDate: {
    type: Date,
    default: Date.now(),
  },
  proPic: {
    type: String,
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
});

cwSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// only run if the password had modified
cwSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Export the schema
const Cw = mongoose.model('Cw', cwSchema);
module.exports = Cw;
