const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// Schema config
const dogSchema = new mongoose.Schema({
  dogName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Must have a name'],
    maxlength: [50, 'Name cannot be longer than 50 characters'],
    minlength: [1, 'Name at least need to more than 1 characters'],
  },
  slug: String,
  dogPic: {
    type: String,
  },
  breeding: {
    type: String,
  },
  age: {
    type: Number,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

//Docuemnt Middlewares: runs before .save() and .create()

dogSchema.pre('save', function (next) {
  this.slug = slugify(this.dogName, { lower: true });
  next();
});

// Export the schema
const Dog = mongoose.model('Dog', dogSchema);
console.log(dogSchema);
module.exports = Dog;
