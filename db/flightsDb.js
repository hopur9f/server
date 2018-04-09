const { queryDb } = require('./db');
const xss = require('xss'); // eslint-disable-line
const INSERT_INTO_FLIGHTS =
  'INSERT INTO flights(airline, flightnumber, origin, destination, adultPrice, childPrice, duration, disabilityAccess, animalTransfer, departure, arrival, handLuggagePrice, luggagePrice, availableSeatList) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
const READ_ALL_FLIGHTS = 'SELECT * FROM flights';

async function readAll() {
  const result = await queryDb(READ_ALL_FLIGHTS);
  if (result) {
    return {
      success: true,
      data: result.rows,
    };
  }
  return {
    success: false,
    data: [],
  };
}

module.exports = {
  readAll,
  INSERT_INTO_FLIGHTS,
};
