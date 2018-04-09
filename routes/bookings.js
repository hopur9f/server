const express = require('express');

const { readAll } = require('../db/bookingsDb');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function readAllBookings(req, res) {
  const result = await readAll();
  return res.json(result);
}

router.get('/', catchErrors(readAllBookings));

module.exports = router;
