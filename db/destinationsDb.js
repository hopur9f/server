const INSERT_INTO_DESTINATIONS = 'INSERT INTO destinations(iata, name) VALUES ($1, $2) RETURNING *';

module.exports = {
  INSERT_INTO_DESTINATIONS,
};
