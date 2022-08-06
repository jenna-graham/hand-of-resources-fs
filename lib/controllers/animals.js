const { Router } = require('express');
const { Animal } = require('../models/Animal');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Animal.getAnimals();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Animal.getAnimalById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
