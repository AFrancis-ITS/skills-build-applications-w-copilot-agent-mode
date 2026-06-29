import { Router } from 'express';
import UserModel from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find().sort({ totalPoints: -1, name: 1 }).limit(50).lean();
    res.json({ message: 'Users retrieved successfully', count: users.length, items: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default router;