// Load dependencies
//const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

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
  console.log(`Dog App is running on port ${port}🎉🎊🥂🎉🎊🥂🎉🎊🥂`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...!!!!!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
