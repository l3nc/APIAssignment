// import dependencies
const morgan = require('morgan');

const express = require('express');

const app = express();

const cwRouter = require('./routes/cwRoutes');

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// using express framework to process json
app.use(express.json());

app.use((req, res, next) => {
  console.log('Server is running as normal!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes
app.use('/api/v1/cws', cwRouter);

module.exports = app;
