import { Router } from 'express';
import WorkoutModel from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().sort({ durationMinutes: 1, title: 1 }).limit(100).lean();
    res.json({ message: 'Workouts retrieved successfully', count: workouts.length, items: workouts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default router;