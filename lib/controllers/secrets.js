const { Router } = require('express');
const { Secret } = require('../models/Secret');

//
module.exports = Router().get('/', async (req, res, next) => {
  try {
    const secrets = await Secret.getAll();
    const filteredSecrets = secrets.map(
      ({ title, description, createdAt }) => ({ title, description, createdAt })
    );
    res.json(filteredSecrets);
  } catch (e) {
    next(e);
  }
});
