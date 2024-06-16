const db = require('../utils/db');

const addPenalty = async (penalty) => {
  const { member_code } = penalty;
  const result = await db.query(
    'INSERT INTO penalties (member_code) VALUES ($1) RETURNING *',
    [member_code]
  );
  return result.rows[0];
};

const liftPenalty = async (id) => {
  const result = await db.query(
    'UPDATE penalties SET lifted_date = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  addPenalty,
  liftPenalty,
};
