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
}

module.exports = { Crystal };
