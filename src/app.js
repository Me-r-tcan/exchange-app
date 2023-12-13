require('express-async-errors');
const express = require('express');
const tradeRouter = require('./routes/trade');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use('/api/trade', tradeRouter);
app.use(errorMiddleware);

module.exports = app;
