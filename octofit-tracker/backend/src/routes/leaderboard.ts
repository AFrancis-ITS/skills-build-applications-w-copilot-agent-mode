import { Router } from 'express';
import LeaderboardModel from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate('user', 'name email')
      .populate('team', 'name city')
      .sort({ rank: 1 })
      .limit(100)
      .lean();

    res.json({ message: 'Leaderboard retrieved successfully', count: leaderboard.length, items: leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default router;