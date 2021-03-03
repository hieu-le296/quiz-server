// Import the 3rd party modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Import modules
const questions = require('./routes/questions');
dotenv.config({ path: './config/config.env' });
const Database = require('./utils/db-query');

const app = express();

// Using bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount the router
app.use('/api/questions', questions);

const connect = new Database();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
