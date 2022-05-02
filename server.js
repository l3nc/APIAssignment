'use strict';
// Server
const app = require('./app');

const port = 8000;
app.listen(port, () => {
  console.log(`Dog App is running on port ${port}`);
});
