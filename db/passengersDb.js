const { queryDb } = require('./db');
const xss = require('xss'); // eslint-disable-line

const READ_ALL_PASSENGERS = 'SELECT * FROM passengers';

async function readAll() {
  const result = await queryDb(READ_ALL_PASSENGERS);
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
