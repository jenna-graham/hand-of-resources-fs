const { Router } = require('express');
const { Song } = require('../models/Song');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Song.getAllSongs();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
