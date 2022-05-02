'use strict'
// import dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const cwRouter = require('./routes/cwRoutes');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
})

//routes
app.use('/api/v1/cw', cwRouter);

// Server
const port = 8000;
app.listen(port, () => {
  console.log(`Dog App is running on port ${port}`);
});

