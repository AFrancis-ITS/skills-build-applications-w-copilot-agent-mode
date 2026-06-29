import { Router } from 'express';
import TeamModel from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await TeamModel.find()
      .populate('members', 'name email fitnessLevel totalPoints weeklyMinutes')
      .sort({ totalPoints: -1, name: 1 })
      .lean();

    res.json({ message: 'Teams retrieved successfully', count: teams.length, items: teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default router;