import { Router } from 'express';
import ActivityModel from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', 'name email')
      .populate('team', 'name city')
      .sort({ occurredAt: -1 })
      .limit(100)
      .lean();

    res.json({ message: 'Activities retrieved successfully', count: activities.length, items: activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default router;