const db = require('../utils/db');

const createTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS penalties (
      id SERIAL PRIMARY KEY,
      member_code VARCHAR(10) REFERENCES members(code),
      start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      end_date TIMESTAMP
    )
  `);
};

const getAllPenalties = async () => {
  const result = await db.query('SELECT * FROM penalties');
  return result.rows;
};

module.exports = {
  createTable,
  getAllPenalties,
};