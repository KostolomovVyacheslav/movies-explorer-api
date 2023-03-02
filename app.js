require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const limiter = require('./utils/limiterConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const handleError = require('./middlewares/handleError');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(requestLogger);

app.use(cors);
app.use(cookieParser());
app.use(limiter);
app.use(helmet());

app.use(express.json());

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
});
