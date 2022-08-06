const pool = require('../utils/pool');

class Pet {
  id;
  name;
  breed;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
    this.age = row.age;
  }

  static async getPets() {
    const { rows } = await pool.query(`
    SELECT * from pets
    `);
    return rows.map((row) => new Pet(row));
  }
}
module.exports = { Pet };
