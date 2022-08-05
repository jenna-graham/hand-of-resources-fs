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
  static async addCrystal(crystal) {
    const { rows } = await pool.query(
      `INSERT INTO crystals (name, color, zodiac, properties)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [crystal.name, crystal.color, crystal.zodiac, crystal.properties]
    );
    return new Crystal(rows[0]);
  }
  static async updateCrystalById(id, newAtters) {
    const crystal = await Crystal.getCrystalByID(id);
    if (!crystal) return null;
    const updatedData = { ...crystal, ...newAtters };
    const { rows } = await pool.query(
      `
    UPDATE crystals
    SET name = $2, color = $3, zodiac = $4, properties = $5
    WHERE id = $1
    RETURNING *
    `,
      [
        id,
        updatedData.name,
        updatedData.color,
        updatedData.zodiac,
        updatedData.properties,
      ]
    );
    return new Crystal(rows[0]);
  }
}

module.exports = { Crystal };
