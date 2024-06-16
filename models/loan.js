const db = require('../utils/db');

const createTable = async () => {
  // Create table loans if not exists
  await db.query(`
    CREATE TABLE IF NOT EXISTS loans (
      id SERIAL PRIMARY KEY,
      member_code VARCHAR(10) REFERENCES members(code),
      book_code VARCHAR(10) REFERENCES books(code),
      loan_date DATE DEFAULT CURRENT_DATE,
      return_date DATE,
      status VARCHAR(50) DEFAULT 'borrowed'
    )
  `);

  // Create table penalties if not exists
  
};

const getAllLoans = async () => {
  const result = await db.query('SELECT * FROM loans');
  return result.rows;
};

module.exports = {
  createTable,
  getAllLoans,
};
