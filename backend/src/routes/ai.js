const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

// Optional: You can apply authMiddleware if you only want logged-in users to use AI
// router.use(authMiddleware);

router.post('/chat', aiController.chatTutor);
router.post('/generate-quiz', aiController.generateQuiz);
router.post('/generate-mindmap', aiController.generateMindmap);

module.exports = router;
