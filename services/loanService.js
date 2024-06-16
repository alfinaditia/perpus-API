const db = require('../utils/db');

const getAllLoans = async () => {
  const result = await db.query('SELECT * FROM loans');
  return result.rows;
};

// Fungsi-fungsi lain seperti borrowBook dan returnBook
const borrowBook = async (loan) => {
  const { member_code, book_code } = loan;

  // Periksa apakah buku tersedia
  const bookResult = await db.query('SELECT * FROM books WHERE code = $1', [book_code]);
  if (bookResult.rows.length === 0) {
    throw new Error('Book tidak ditemukan');
  }
  const book = bookResult.rows[0];
  if (book.stock <= 0) {
    throw new Error('Buku HABIS!');
  }

  // Periksa apakah member masih memiliki sanksi
  const penalties = await db.query(
    'SELECT * FROM penalties WHERE member_code = $1 AND end_date >= CURRENT_DATE',
    [member_code]
  );
  if (penalties.rows.length > 0) {
    throw new Error('Member masih ada pelanggaran pengembalian');
  }

  // Periksa apakah buku sudah dipinjam oleh member dan belum dikembalikan
  const existingLoan = await db.query(
    'SELECT * FROM loans WHERE member_code = $1 AND book_code = $2 AND status = $3',
    [member_code, book_code, 'borrowed']
  );
  if (existingLoan.rows.length > 0) {
    throw new Error('Buku sudah dipinjam sama user');
  }

  // Kurangi stok buku
  await db.query('UPDATE books SET stock = stock - 1 WHERE code = $1', [book_code]);

  const loanDate = new Date().toISOString().split('T')[0]; // Hanya tanggal
  const result = await db.query(
    'INSERT INTO loans (member_code, book_code, loan_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [member_code, book_code, loanDate, 'borrowed']
  );
  return result.rows[0];
};

const returnBook = async (member_code, book_code) => {
  const loanResult = await db.query(
    'SELECT * FROM loans WHERE member_code = $1 AND book_code = $2',
    [member_code, book_code]
  );

  if (loanResult.rows.length === 0) {
    throw new Error('Pinjaman tidak ditemukan');
  }

  const loan = loanResult.rows[0];
  if (loan.status === 'returned') {
    throw new Error('Buku sudah dikembalikan');
  }

  const returnDate = new Date().toISOString().split('T')[0]; // Hanya tanggal
  const loanDate = new Date(loan.loan_date);

  const diffTime = new Date(returnDate).getTime() - loanDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let penaltyStartDate = null;
  let penaltyEndDate = null;

  if (diffDays > 7) {
    const penaltyStart = new Date().toISOString().split('T')[0]; // Hanya tanggal
    const penaltyEnd = new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0]; // Hanya tanggal

    penaltyStartDate = penaltyStart;
    penaltyEndDate = penaltyEnd;

    await db.query(
      'INSERT INTO penalties (member_code, start_date, end_date) VALUES ($1, $2, $3)',
      [member_code, penaltyStartDate, penaltyEndDate]
    );
  }

  // Tambah stok buku
  await db.query('UPDATE books SET stock = stock + 1 WHERE code = $1', [book_code]);

  const updateResult = await db.query(
    'UPDATE loans SET status = $1, return_date = $2 WHERE member_code = $3 AND book_code = $4 RETURNING *',
    ['returned', returnDate, member_code, book_code]
  );

  return {
    ...updateResult.rows[0],
    penaltyStartDate: penaltyStartDate,
    penaltyEndDate: penaltyEndDate
  };
};

module.exports = {
  borrowBook,
  returnBook,
  getAllLoans
};
