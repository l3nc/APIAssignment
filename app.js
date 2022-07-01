/**
 * import package or file
 */
const morgan = require('morgan');
const express = require('express');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cwRouter = require('./routes/cwRoutes');
const dogRouter = require('./routes/dogRoutes');
const cors = require('cors');

/**
 * // define the curent either dev or production env.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
// avoiding fail connection with front end differ ports.
 * 
 */
app.use(cors());
/**
 * 
// using express framework to process json
 */
app.use(express.json());

app.use((req, res, next) => {
  console.log('Server is running as normal!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
/**
//routes
 * 
 */
app.use('/api/v1/cws', cwRouter);
app.use('/api/v1/dogs', dogRouter);

/**
//show error with unknow route requested.
 * 
 */
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
