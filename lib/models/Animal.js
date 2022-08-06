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
  static async getAnimalById(id) {
    const { rows } = await pool.query(
      `
    SELECT * from animals
    WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Animal(rows[0]);
  }

  static async addAnimal(animal) {
    const { rows } = await pool.query(
      `
    INSERT INTO animals (type, color, origin)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [animal.type, animal.color, animal.origin]
    );
    return new Animal(rows[0]);
  }

  static async updateAnimalById(id, newAtters) {
    const animal = await Animal.getAnimalById(id);
    if (!animal) return null;
    const updatedData = { ...animal, ...newAtters };
    const { rows } = await pool.query(
      `
    UPDATE animals
    SET type = $2, color = $3, origin = $4
    WHERE id = $1
    RETURNING *
    `,
      [id, updatedData.type, updatedData.color, updatedData.origin]
    );
    return new Animal(rows[0]);
  }

  static async deleteAnimal(id) {
    const { rows } = await pool.query(
      `
    DELETE from animals
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Animal(rows[0]);
  }
}
module.exports = { Animal };
