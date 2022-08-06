const pool = require('../utils/pool');

class Animal {
  id;
  type;
  color;
  origin;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.color = row.color;
    this.origin = row.origin;
  }

  static async getAnimals() {
    const { rows } = await pool.query(`
    SELECT * from animals
    `);
    return rows.map((row) => new Animal(row));
  }
}
module.exports = { Animal };
