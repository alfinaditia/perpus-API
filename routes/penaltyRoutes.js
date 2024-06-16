const express = require('express');
const penaltyController = require('../controllers/penaltyController');

const router = express.Router();

router.post('/', penaltyController.addPenalty);
router.put('/:id/lift', penaltyController.liftPenalty);

module.exports = router;
