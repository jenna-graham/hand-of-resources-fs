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
}

module.exports = { Ice_cream };
