require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');
// const validateBearerToken = require('./validate-bearer-token');
const errorHandler = require('./error-handler');
const acroElementsRouter = require('./acroElements/acroElements-router');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));


app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/acroelements', acroElementsRouter);

app.get('/', (req, res) => {
  res.send('Hello, boilerplate!')
});

app.use(errorHandler);

module.exports = app;
