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

  static async addPet(pet) {
    const { rows } = await pool.query(
      `
    INSERT INTO pets (name, breed, age)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [pet.name, pet.breed, pet.age]
    );
    return new Pet(rows[0]);
  }

  static async updatePetById(id, newAtters) {
    const pet = await Pet.getPetById(id);
    if (!pet) return null;
    const updatedData = { ...pet, ...newAtters };
    const { rows } = await pool.query(
      `
    UPDATE pets
    SET name = $2, breed = $3, age =$4
    WHERE id = $1
    RETURNING *
    `,
      [id, updatedData.name, updatedData.breed, updatedData.age]
    );
    return new Pet(rows[0]);
  }
}
module.exports = { Pet };
