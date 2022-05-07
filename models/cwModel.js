const mongoose = require('mongoose');

// Schema config
const cwSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Must have a name'],
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
