require('dotenv').config();

const { Client } = require('pg');
const csv = require('csvtojson');

const { INSERT_INTO_DESTINATIONS } = require('./db/destinationsDb');

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
async function populate(destinationsParsed) {
  const client = new Client({ connectionString });
  await client.connect();

  // Synchronusly write the destinations to the database
  for (let i = 0; i < destinationsParsed.length; i += 1) {
    const destination = destinationsParsed[i];

    // Add the destination to the database
    const destinationValues = [destination.iata, destination.name];
    await query(INSERT_INTO_DESTINATIONS, destinationValues, client);
  }

  client.end();
  console.info('Database populated');
}

// Reads the csv file and parses the data
async function readFile() {
  const destinationsParsed = [];

  // Read the csv
  const csvFilePath = './data/destinations.csv';
  csv()
    .fromFile(csvFilePath)
    .on('json', (destination) => {
      // Store each destination
      destinationsParsed.push(destination);
    })
    .on('done', async (error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.info('File read');

      populate(destinationsParsed);
    });
  console.info('Starting');
}

readFile().catch((err) => {
  console.error('Error populating schema', err);
});
