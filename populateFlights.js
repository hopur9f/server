require('dotenv').config();

const { Client } = require('pg');
const csv = require('csvtojson');

const { INSERT_INTO_FLIGHTS } = require('./db/flightsDb');

const connectionString = process.env.DATABASE_URL;

// Custom query that doesnt close the connection
async function query(q, values, client) {
  try {
    const result = await client.query(q, values);
    return result;
  } catch (err) {
    console.error('Error running query, closing connection');
    client.end();
    throw err;
  }
}

// Populates the database with the data
async function populate(flightsParsed) {
  const client = new Client({ connectionString });
  await client.connect();

  // Synchronusly write the flights to the database
  for (let i = 0; i < flightsParsed.length; i += 1) {
    const flight = flightsParsed[i];

    // Add the flight to the database
    const flightValues = [
      flight.airline,
      flight.flightnumber,
      flight.origin,
      flight.destination,
      flight.adultPrice,
      flight.childPrice,
      flight.duration,
      flight.disabilityAccess,
      flight.animalTransfer,
      flight.departure,
      flight.arrival,
      flight.handLuggagePrice,
      flight.luggagePrice,
      flight.availableSeatList,
    ];
    await query(INSERT_INTO_FLIGHTS, flightValues, client);
  }

  client.end();
  console.info('Database populated');
}

// Reads the csv file and parses the data
async function readFile() {
  const flightsParsed = [];

  // Read the csv
  const csvFilePath = './data/flights.csv';
  csv()
    .fromFile(csvFilePath)
    .on('json', (flight) => {
      // Store each flight
      flightsParsed.push(flight);
    })
    .on('done', async (error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.info('File read');

      populate(flightsParsed);
    });
  console.info('Starting');
}

readFile().catch((err) => {
  console.error('Error populating schema', err);
});
