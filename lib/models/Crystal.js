const pool = require('../utils/pool');

class Crystal {
  id;
  name;
  color;
  zodiac;
  properties;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.zodiac = row.zodiac;
    this.properties = row.properties;
  }
  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * from crystals;
    `);
    return rows.map((row) => new Crystal(row));
  }
  static async getCrystalByID(id) {
    const { rows } = await pool.query(
      `
    SELECT * from crystals
    WHERE id = $1
    `,
      [id]
    );
    return new Crystal(rows[0]);
  }
}

module.exports = { Crystal };
