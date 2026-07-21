const express = require('express');
const router = express.Router();
const { createReport, getReports, deleteReport } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports);
router.delete('/:id', authMiddleware, deleteReport);

module.exports = router;
