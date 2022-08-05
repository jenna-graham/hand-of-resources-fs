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
    if (rows.length === 0) {
      return null;
    }
    return new Song(rows[0]);
  }
  static async addSong(song) {
    const { rows } = await pool.query(
      `INSERT INTO songs (title, artist, released)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [song.title, song.artist, song.released]
    );
    return new Song(rows[0]);
  }

  static async updateSongById(id, newAtters) {
    const song = await Song.getSongById(id);
    if (!song) return null;
    const updatedData = { ...song, ...newAtters };
    const { rows } = await pool.query(
      `
    UPDATE songs
    SET title = $2, artist = $3, released = $4
    WHERE id = $1
    RETURNING *
    `,
      [id, updatedData.title, updatedData.artist, updatedData.released]
    );
    return new Song(rows[0]);
  }
  static async deleteSong(id) {
    const { rows } = await pool.query(
      `
    DELETE from songs
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Song(rows[0]);
  }
}
module.exports = { Song };
