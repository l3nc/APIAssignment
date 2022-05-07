// Load dependencies
//const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Connect to mongoDB server
dotenv.config({ path: './config.env' });

const uri =
  'mongodb+srv://nelson:kyneMIuqlsfNP6pq@cluster0.l7nav.mongodb.net/assignments?retryWrites=true&w=majority';

//Connect
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful');
  });

const app = require('./app');

const port = 6000;
app.listen(port, () => {
  console.log(`Dog App is running on port ${port}`);
});
