const { Router } = require('express');
const { Pet } = require('../models/Pet');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Pet.getPets();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
