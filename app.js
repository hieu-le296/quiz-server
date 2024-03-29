// Import the 3rd party modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// Import modules
const questions_user = require('./routes/questions_user');
const questions_admin = require('./routes/questions_admin');

dotenv.config({ path: './config/config.env' });
// const Database = require('./utils/db-query');

const app = express();

// Using bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  })
);

// Use cors
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount the router
app.use('/api/questions', questions_user);
app.use('/api/admin/questions', questions_admin);

// const connect = new Database();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
