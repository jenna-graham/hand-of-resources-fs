const { Router } = require('express');
const { Crystal } = require('../models/Crystal');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Crystal.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
