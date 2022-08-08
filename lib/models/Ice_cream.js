const pool = require('../utils/pool');

class Ice_cream {
  id;
  name;
  rating;
  favorite;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.rating = row.rating;
    this.favorite = row.favorite;
  }

  static async getIce_cream() {
    const { rows } = await pool.query(`
    SELECT * from ice_cream`);
    return rows.map((row) => new Ice_cream(row));
  }

  static async getIce_creamById(id) {
    const { rows } = await pool.query(
      `
    SELECT * from ice_cream
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Ice_cream(rows[0]);
  }

  static async addIce_Cream(ice_cream) {
    const { rows } = await pool.query(
      `INSERT INTO ice_cream (name, rating, favorite)
      VALUES ($1, $2, $3)
      RETURNING *      
      `,
      [ice_cream.name, ice_cream.rating, ice_cream.favorite]
    );
    return new Ice_cream(rows[0]);
  }

  static async updateIce_CreamById(id, newAtters) {
    const ice_cream = await Ice_cream.getIce_creamById(id);
    if (!ice_cream) return null;
    const updatedData = { ...ice_cream, ...newAtters };
    const { rows } = await pool.query(
      `
      UPDATE ice_cream
      SET name = $2, rating = $3, favorite = $4
      WHERE id = $1
      RETURNING *
      `,
      [id, updatedData.name, updatedData.rating, updatedData.favorite]
    );
    return new Ice_cream(rows[0]);
  }

  static async deleteIce_Cream(id) {
    const { rows } = await pool.query(
      `
    DELETE from ice_cream
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Ice_cream(rows[0]);
  }
}

module.exports = { Ice_cream };
