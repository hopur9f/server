const { queryDb } = require('./db');
const xss = require('xss'); // eslint-disable-line

const READ_ALL_BOOKINGS = 'SELECT * FROM bookings';

async function readAll() {
  const result = await queryDb(READ_ALL_BOOKINGS);
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
};
