const express = require('express');
const loanController = require('../controllers/loanController');

const router = express.Router();

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Meminjam buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_code:
 *                 type: string
 *                 example: "M001"
 *               book_code:
 *                 type: string
 *                 example: "JK-45"
 *     responses:
 *       201:
 *         description: Buku berhasil dipinjam
 *       404:
 *         description: Buku tidak tersedia atau anggota tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */

router.post('/', loanController.borrowBook);

/**
 * @swagger
 * /loans:
 *   put:
 *     summary: Mengembalikan buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_code:
 *                 type: string
 *                 example: "M001"
 *               book_code:
 *                 type: string
 *                 example: "JK-45"
 *     responses:
 *       200:
 *         description: Buku berhasil dikembalikan
 *       404:
 *         description: Peminjaman tidak ditemukan atau buku sudah dikembalikan sebelumnya
 *       500:
 *         description: Terjadi kesalahan server
 */

router.put('/', loanController.returnBook);

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Mendapatkan daftar semua peminjaman
 *     responses:
 *       200:
 *         description: Daftar semua peminjaman
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   member_code:
 *                     type: string
 *                     example: "M001"
 *                   book_code:
 *                     type: string
 *                     example: "JK-45"
 *                   loan_date:
 *                     type: string
 *                     example: "2024-06-16"
 *                   return_date:
 *                     type: string
 *                     example: "2024-06-18"
 *                   status:
 *                     type: string
 *                     example: "returned"
 */

router.get('/', loanController.getAllLoans);

module.exports = router;
