// import dependencies
const morgan = require('morgan');

const express = require('express');

const app = express();

const cwRouter = require('./routes/cwRoutes');
const dogRouter = require('./routes/dogRoutes');

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
app.use('/api/v1/dogs', dogRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on this server!`,
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode),
    json({
      status: err.status,
      message: err.message,
    });
});

module.exports = app;
