const mongoose = require('mongoose');

//Schema
const cwSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  proPic: {
    type: String,
  },
  proEmail: {
    type: String,
    required: [true, 'Use to Login'],
  },
  loginID: {
    type: String,
    required: true,
    default: cwSchema.proEmail,
  },
});
