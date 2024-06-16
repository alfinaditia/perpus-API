const db = require('../utils/db');

const createTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS members (
      code VARCHAR(10) PRIMARY KEY,
      name VARCHAR(100)
    )
  `);
};

module.exports = { createTable };
