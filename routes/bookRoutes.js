const express = require('express');
const bookController = require('../controllers/bookController');


const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: List buku
 *     responses:
 *       200:
 *         description: Menampilkan list buku-buku yang ada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: "BK001"
 *                   title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   stock:
 *                     type: integer
 *                     example: 3
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Menambahkan buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "BK010"
 *               title:
 *                 type: string
 *                 example: "Dilan 1991"
 *               author:
 *                 type: string
 *                 example: "Pidi Baiq"
 *               stock:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router.post('/', bookController.addBook);

module.exports = router;
