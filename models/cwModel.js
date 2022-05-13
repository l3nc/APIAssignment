const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

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
  proPic: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Use to Login'],
    trim: true,
    unique: [true, 'cannot register duplicate email address'],
  },
  password: {
    type: String,
    required: [true, 'Must have a password'],
    trim: true,
    maxlength: [50, 'Password cannot be longer than 50 characters'],
    minlength: [1, 'Password at least need to more than 1 characters'],
  },
});

cwSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Export the schema
const Cw = mongoose.model('Cw', cwSchema);
module.exports = Cw;
