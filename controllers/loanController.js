const loanService = require('../services/loanService');

const borrowBook = async (req, res) => {
  try {
    const result = await loanService.borrowBook(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  const { member_code, book_code } = req.body;
  try {
    const result = await loanService.returnBook(member_code, book_code);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLoans = async (req, res) => {
  try {
    const loans = await loanService.getAllLoans();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getAllLoans,
};
