// Load dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
// Connect to mongoDB server
dotenv.config({ path: './config.env' });

// replace DATABASE_PASSWORD into connect mongoDB URI
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const port = 6000;
app.listen(port, () => {
  console.log(`Dog App is running on port ${port}`);
});
