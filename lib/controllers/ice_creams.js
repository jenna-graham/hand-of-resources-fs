const { Router } = require('express');
const { Ice_cream } = require('../models/Ice_cream');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Ice_cream.getIce_cream();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Ice_cream.getIce_creamById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Ice_cream.addIce_Cream(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Ice_cream.updateIce_CreamById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
