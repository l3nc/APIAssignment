const mongoose = require('mongoose');
const validator = require('validator');

// Schema config
const cwSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Must have a name'],
    maxlength: [50, 'Name cannot be longer than 50 characters'],
    minlength: [1, 'Name at least need to more than 1 characters'],
    validate: {
      validator: 'matches',
      arguments: ['^[a-zA-Z-]'],
    },
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
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Must have a password'],
    trim: true,
  },
});

// Export the schema
const Cw = mongoose.model('Cw', cwSchema);
module.exports = Cw;
