const db = require('../utils/db');

const getAllBooks = async () => {
  const result = await db.query('SELECT * FROM books');
  return result.rows;
};

const addBook = async (book) => {
  const { code, title, author, stock } = book;
  const result = await db.query(
    'INSERT INTO books (code, title, author, stock) VALUES ($1, $2, $3, $4) RETURNING *',
    [code, title, author, stock]
  );
  return result.rows[0];
};

module.exports = {
  getAllBooks,
  addBook,
};
