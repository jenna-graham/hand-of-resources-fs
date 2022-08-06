const { Router } = require('express');
const { Pet } = require('../models/Pet');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Pet.getPets();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Pet.getPetById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Pet.addPet(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
