const { Router, json } = require('express');
const { Crystal } = require('../models/Crystal');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Crystal.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Crystal.getCrystalByID(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Crystal.addCrystal(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Crystal.updateCrystalById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Crystal.deleteCrystal(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
