'use strict'

const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

const port = 8000;
app.listen(port, () => {
  console.log(`Dog App is running on port ${port}`);
});