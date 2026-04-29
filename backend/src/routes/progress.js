const express = require('express');
const router = express.Router();
const { getProgress, updateProgress } = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getProgress);
router.post('/update', authMiddleware, updateProgress);

module.exports = router;
