const express = require('express');
const router = express.Router();
const { createEstimate, getEstimates, getEstimateById, deleteEstimate } = require('../controllers/estimateController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createEstimate);
router.get('/', authMiddleware, getEstimates);
router.get('/:id', authMiddleware, getEstimateById);
router.delete('/:id', authMiddleware, deleteEstimate);

module.exports = router;
