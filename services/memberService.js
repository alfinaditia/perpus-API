const db = require('../utils/db');

const getAllMembers = async () => {
  const result = await db.query('SELECT * FROM members');
  return result.rows;
};

const addMember = async (member) => {
  const { code, name } = member;
  const result = await db.query(
    'INSERT INTO members (code, name) VALUES ($1, $2) RETURNING *',
    [code, name]
  );
  return result.rows[0];
};

module.exports = {
  getAllMembers,
  addMember,
};
