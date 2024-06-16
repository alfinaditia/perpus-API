const penaltyService = require('../services/penaltyService');

const addPenalty = async (req, res) => {
  try {
    const penalty = await penaltyService.addPenalty(req.body);
    res.status(201).json(penalty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const liftPenalty = async (req, res) => {
  try {
    const penalty = await penaltyService.liftPenalty(req.params.id);
    res.json(penalty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPenalty,
  liftPenalty,
};
