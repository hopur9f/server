require('dotenv').config();
const express = require('express');
const flights = require('./routes/flights');
const bookings = require('./routes/bookings');
const passengers = require('./routes/passengers');

const app = express();
const { PORT: port = 3000, HOST: host = '127.0.0.1' } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function notFoundHandler(req, res, next) {
  // eslint-disable-line
  return res.status(404).json({ error: 'Not found' });
}

function errorHandler(err, req, res, next) {
  // eslint-disable-line
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }
  return res.status(500).json({ error: 'Internal server error' });
}

app.use('/flights', flights);
app.use('/bookings', bookings);
app.use('/passengers', passengers);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://${host}:${port}/`);
});
