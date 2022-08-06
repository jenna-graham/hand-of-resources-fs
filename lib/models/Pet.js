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

  static async getPetById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM pets
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Pet(rows[0]);
  }
}
module.exports = { Pet };
