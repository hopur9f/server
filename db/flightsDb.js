const INSERT_INTO_FLIGHTS = 'INSERT INTO flights(airline, flightnumber, origin, destination, adultPrice, childPrice, duration, disabilityAccess, animalTransfer, departure, arrival, handLuggagePrice, luggagePrice, availableSeatList) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';

module.exports = {
  INSERT_INTO_FLIGHTS,
};
