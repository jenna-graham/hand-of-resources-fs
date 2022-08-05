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
  static async getSongById(id) {
    const { rows } = await pool.query(
      `
    SELECT * from songs
    WHERE id = $1
    `,
      [id]
    );
    // if (rows.length === 0) {
    //   return null;
    // }
    return new Song(rows[0]);
  }
}
module.exports = { Song };
