const pool = require('../utils/pool');

class Song {
  id;
  title;
  artist;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.released = row.released;
  }
  static async getAllSongs() {
    const { rows } = await pool.query(`
    SELECT * from songs
    `);
    return rows.map((row) => new Song(row));
  }
}
module.exports = { Song };
