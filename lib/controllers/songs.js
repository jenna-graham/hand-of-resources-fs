const { Router } = require('express');
const { Song } = require('../models/Song');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Song.getAllSongs();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Song.getSongById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Song.addSong(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
