const { Router } = require('express');
const { authenticate } = require('../middleware/authenticate');
const { Secret } = require('../models/Secret');

//
module.exports = Router().get('/', async (req, res, next) => {
  try {
    const secrets = await Secret.getAll();
    console.log('secrets::', secrets);
    //TODO actually filter out the id
    const filteredSecrets = secrets;
    res.json(filteredSecrets);
  } catch (e) {
    next(e);
  }
});
