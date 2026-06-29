import ActivityModel from '../models/Activity';
import { connectDatabase, disconnectDatabase } from '../config/database';
import LeaderboardModel from '../models/Leaderboard';
import TeamModel from '../models/Team';
import UserModel from '../models/User';
import WorkoutModel from '../models/Workout';

async function seed(): Promise<void> {
  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Maya Torres',
      email: 'maya.torres@octofit.local',
      fitnessLevel: 'advanced',
      totalPoints: 1560,
      weeklyMinutes: 340,
    },
    {
      name: 'Jordan Lee',
      email: 'jordan.lee@octofit.local',
      fitnessLevel: 'intermediate',
      totalPoints: 1240,
      weeklyMinutes: 290,
    },
    {
      name: 'Priya Singh',
      email: 'priya.singh@octofit.local',
      fitnessLevel: 'advanced',
      totalPoints: 1410,
      weeklyMinutes: 320,
    },
    {
      name: 'Noah Carter',
      email: 'noah.carter@octofit.local',
      fitnessLevel: 'beginner',
      totalPoints: 690,
      weeklyMinutes: 180,
    },
    {
      name: 'Elena Park',
      email: 'elena.park@octofit.local',
      fitnessLevel: 'intermediate',
      totalPoints: 980,
      weeklyMinutes: 230,
    },
    {
      name: 'Diego Alvarez',
      email: 'diego.alvarez@octofit.local',
      fitnessLevel: 'intermediate',
      totalPoints: 1050,
      weeklyMinutes: 260,
    },
  ]);

  const summitTeam = await TeamModel.create({
    name: 'Summit Sprinters',
    city: 'Seattle',
    members: [users[0]._id, users[2]._id, users[4]._id],
    totalPoints: users[0].totalPoints + users[2].totalPoints + users[4].totalPoints,
  });

  const pulseTeam = await TeamModel.create({
    name: 'Pulse Riders',
    city: 'Austin',
    members: [users[1]._id, users[3]._id, users[5]._id],
    totalPoints: users[1].totalPoints + users[3].totalPoints + users[5].totalPoints,
  });

  await UserModel.updateMany(
    { _id: { $in: [users[0]._id, users[2]._id, users[4]._id] } },
    { $set: { team: summitTeam._id } },
  );

  await UserModel.updateMany(
    { _id: { $in: [users[1]._id, users[3]._id, users[5]._id] } },
    { $set: { team: pulseTeam._id } },
  );

  const now = new Date();
  await ActivityModel.insertMany([
    {
      user: users[0]._id,
      team: summitTeam._id,
      activityType: 'run',
      durationMinutes: 52,
      caloriesBurned: 520,
      distanceKm: 9.6,
      occurredAt: new Date(now.getTime() - 1000 * 60 * 60 * 20),
    },
    {
      user: users[2]._id,
      team: summitTeam._id,
      activityType: 'strength',
      durationMinutes: 45,
      caloriesBurned: 410,
      distanceKm: 0,
      occurredAt: new Date(now.getTime() - 1000 * 60 * 60 * 28),
    },
    {
      user: users[4]._id,
      team: summitTeam._id,
      activityType: 'yoga',
      durationMinutes: 38,
      caloriesBurned: 210,
      distanceKm: 0,
      occurredAt: new Date(now.getTime() - 1000 * 60 * 60 * 36),
    },
    {
      user: users[1]._id,
      team: pulseTeam._id,
      activityType: 'cycle',
      durationMinutes: 61,
      caloriesBurned: 610,
      distanceKm: 24.2,
      occurredAt: new Date(now.getTime() - 1000 * 60 * 60 * 16),
    },
    {
      user: users[3]._id,
      team: pulseTeam._id,
      activityType: 'walk',
      durationMinutes: 34,
      caloriesBurned: 170,
      distanceKm: 3.9,
      occurredAt: new Date(now.getTime() - 1000 * 60 * 60 * 46),
    },
    {
      user: users[5]._id,
      team: pulseTeam._id,
      activityType: 'swim',
      durationMinutes: 42,
      caloriesBurned: 430,
      distanceKm: 1.4,
      occurredAt: new Date(now.getTime() - 1000 * 60 * 60 * 25),
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Tempo Run Builder',
      focusArea: 'Endurance',
      intensity: 'high',
      durationMinutes: 40,
      equipment: ['running shoes'],
      tags: ['cardio', 'stamina'],
      recommendedForLevel: 'intermediate',
    },
    {
      title: 'Core and Mobility Flow',
      focusArea: 'Core Stability',
      intensity: 'low',
      durationMinutes: 30,
      equipment: ['yoga mat'],
      tags: ['mobility', 'recovery'],
      recommendedForLevel: 'beginner',
    },
    {
      title: 'Bike Power Intervals',
      focusArea: 'Leg Power',
      intensity: 'high',
      durationMinutes: 35,
      equipment: ['bike'],
      tags: ['interval', 'cycling'],
      recommendedForLevel: 'advanced',
    },
    {
      title: 'Total Body Strength Circuit',
      focusArea: 'Full Body',
      intensity: 'moderate',
      durationMinutes: 45,
      equipment: ['dumbbells', 'bench'],
      tags: ['strength', 'conditioning'],
      recommendedForLevel: 'intermediate',
    },
  ]);

  const weeklyRankedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  await LeaderboardModel.insertMany(
    weeklyRankedUsers.map((user, index) => ({
      user: user._id,
      team: user.team ?? (index % 2 === 0 ? summitTeam._id : pulseTeam._id),
      points: user.totalPoints,
      weeklyMinutes: user.weeklyMinutes,
      rank: index + 1,
      weekOf: startOfWeek,
    })),
  );

  const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
    UserModel.countDocuments(),
    TeamModel.countDocuments(),
    ActivityModel.countDocuments(),
    LeaderboardModel.countDocuments(),
    WorkoutModel.countDocuments(),
  ]);

  console.log('Seeding complete:', {
    users: userCount,
    teams: teamCount,
    activities: activityCount,
    leaderboard: leaderboardCount,
    workouts: workoutCount,
  });

  await disconnectDatabase();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await disconnectDatabase();
  process.exit(1);
});