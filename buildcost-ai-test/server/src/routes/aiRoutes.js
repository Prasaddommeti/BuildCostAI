const express = require('express');
const router = express.Router();
const { predictCost, getRecommendations } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/predict', authMiddleware, predictCost);
router.post('/recommend', authMiddleware, getRecommendations);

module.exports = router;
