require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');
const validateBearerToken = require('./validate-bearer-token');
const errorHandler = require('./error-handler');

// const someRouter = require('./some-routers/some-router');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

const app = express();
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

// app.use('/anendpoint', someRouter);

app.get('/', (req, res) => {
  res.send('Hello, boilerplate!')
});

app.use(errorHandler(error, req, res, next));

module.exports = app;
