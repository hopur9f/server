const express = require('express');

const { readAll } = require('../db/passengersDb');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function readAllPassengers(req, res) {
  const result = await readAll();
  return res.status(200).json(result);
}

router.get('/', catchErrors(readAllPassengers));

module.exports = router;
