const prisma = require('../utils/prisma');

const getProgress = async (req, res) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId: req.user.userId },
      include: { topic: true }
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { topicSlug, isCompleted } = req.body;
    
    // Find topic
    const topic = await prisma.topic.findUnique({ where: { slug: topicSlug } });
    if (!topic) {
      // For MVP, if topic not found in DB, we might want to just ignore or return a success
      // because topics are hardcoded in the frontend.
      // But let's create the topic if it doesn't exist for MVP simplicity
      return res.status(404).json({ message: 'Topic not found in database. Please seed topics.' });
    }

    let progress = await prisma.progress.findUnique({
      where: {
        userId_topicId: {
          userId: req.user.userId,
          topicId: topic.id
        }
      }
    });

    if (progress) {
      progress = await prisma.progress.update({
        where: { id: progress.id },
        data: {
          viewCount: progress.viewCount + 1,
          isCompleted: isCompleted !== undefined ? isCompleted : progress.isCompleted,
          lastViewed: new Date()
        }
      });
    } else {
      progress = await prisma.progress.create({
        data: {
          userId: req.user.userId,
          topicId: topic.id,
          viewCount: 1,
          isCompleted: isCompleted || false
        }
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProgress, updateProgress };
