const db = require('../utils/db');

const createTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS books (
      code VARCHAR(10) PRIMARY KEY,
      title VARCHAR(100),
      author VARCHAR(100),
      stock INTEGER
    )
  `);
};

module.exports = { createTable };
