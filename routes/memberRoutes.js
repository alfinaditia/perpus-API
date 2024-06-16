const express = require('express');
const memberController = require('../controllers/memberController');

const router = express.Router();

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Mendapatkan daftar semua anggota
 *     responses:
 *       200:
 *         description: Daftar anggota
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: "M001"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 */
router.get('/', memberController.getAllMembers);


router.post('/', memberController.addMember);

module.exports = router;
